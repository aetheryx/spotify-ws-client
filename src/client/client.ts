import got from "got";
import { TypedEventEmitter } from "./event-emitter.js";
import { IAuthorizationStrategy } from "../auth/authorization-strategy.interface";
import { WebSocket } from "ws";
import { assert } from "console";
import { setTimeout } from 'node:timers/promises';
import { WebsocketEvent, WebsocketEventType } from "../spotify-types/events/websocket-event.js";
import { User } from '../spotify-types/entities/user.js';
import { StateHandler } from "./state-handler.js";
import { ProtobufHandler } from "./protobuf-handler.js";

export enum State {
  IDLE,
  CONNECTING,
  CONNECTED,
  SUBSCRIBING,
  SUBSCRIBED,
}

export interface SpotifySocketOptions {
  authorizationStrategy: IAuthorizationStrategy;
}

export class SpotifyClient extends TypedEventEmitter {
  private connection: WebSocket;
  private connectResolve: ((error?: unknown) => void) | null = null;
  public http = got.extend({
    prefixUrl: 'https://api.spotify.com/v1',
    hooks: {
      beforeRequest: [
        async (options) => {
          options.headers.authorization ??= `Bearer ${await this.options.authorizationStrategy.getAccessToken()}`;
        },
      ],
    },
  });

  public state: State = State.IDLE;
  public selfUser: User | null = null;
  public stateHandler = new StateHandler(this);
  private protobufHandler = new ProtobufHandler(this);

  constructor(
    public options: SpotifySocketOptions
  ) {
    super();
  }

  private setState(state: State) {
    const old = this.state;
    this.state = state;
    this.emit('stateChanged', state, old);
  }

  public connect(): Promise<void> {
    assert(this.state === State.IDLE);
    this.setState(State.CONNECTING);

    return new Promise(async (resolve, reject) => {
      this.connectResolve = (error) => {
        this.connectResolve = null;
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      };

      const url = new URL('wss://dealer.spotify.com');
      url.searchParams.set('access_token', await this.options.authorizationStrategy.getAccessToken());

      this.connection = new WebSocket(url);
      this.connection.on('message', async (message) => {
        try {
          await this.onSocketMessage(message as Buffer);
        } catch (error) {
          this.connectResolve?.(error);
          console.error(error);
        }
      });
      this.connection.on('error', (error) => this.onSocketError(error));
      this.connection.on('close', (code, reason) => this.onSocketClose(code, reason));
      this.connection.on('open', () => this.onSocketOpen());
    });
  }

  private onSocketOpen(): void {
    this.setState(State.CONNECTED);
  }

  private onSocketError(error: Error): void {
    this.connectResolve?.(error);
  }

  private onSocketClose(code: number, reason: Buffer): void {
    console.log('closed', code, reason.toString());
  }

  private onSocketMessage(data: Buffer): unknown {
    const payload: WebsocketEvent = JSON.parse(data.toString());

    if (payload.type !== WebsocketEventType.Message) {
      return;
    }

    const url = new URL(payload.uri);
    if (
      url.protocol === 'hm:' &&
      url.host === 'pusher'
    ) {
      return this.subscribe(payload);
    }

    if (!payload.payloads) {
      return;
    }

    for (const event of payload.payloads) {
      if (typeof event === 'string') {
        this.emit('rawProtobufEvent', payload, event);
        continue;
      }

      for (const payloadEvent of event.events) {
        this.emit('rawEvent', payloadEvent);
      }
    }
  }

  private async getSelfUser(): Promise<User> {
    const response = await this.http.get('me', {
      responseType: 'json',
    });

    return User.parse(response.body);
  }

  private async subscribe(message: WebsocketEvent): Promise<void> {
    const connectionID = message.headers['Spotify-Connection-Id']?.toString();
    assert(connectionID);
    assert(this.state === State.CONNECTED);

    this.setState(State.SUBSCRIBING);
    await setTimeout(2000);
    const response = await this.http.put<{ message?: string }>('me/notifications/player', {
      searchParams: { connection_id: connectionID },
      responseType: 'json',
    });

    if (response.body?.message !== 'Subscription created') {
      throw new Error('failed to subscribe');
    }

    this.selfUser = await this.getSelfUser();
    this.setState(State.SUBSCRIBED);
    this.connectResolve?.();
  }
}