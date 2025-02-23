import { setTimeout } from 'node:timers/promises';
import { WebSocket } from "ws";
import { assert } from "console";
import { WebsocketMessage, WebsocketMessageType } from "../../spotify-types/events/websocket-message.js";
import { WebsocketPayloadEvent } from "../../spotify-types/events/websocket-payload-event";
import { TypedEventEmitter } from "../../util/typed-event-emitter.js";
import { SpotifyClient } from "../client";

export enum SocketState {
  IDLE,
  CONNECTING,
  CONNECTED,
  SUBSCRIBING,
  SUBSCRIBED,
}

type SocketEvents = {
  stateChanged: [newState: SocketState, oldState: SocketState];
  rawMessage: [message: WebsocketMessage];
  rawSerializedEvent: [message: WebsocketMessage, data: string];
  event: [event: WebsocketPayloadEvent];
}


export class SocketModule extends TypedEventEmitter<SocketEvents> {
  private connectResolve: ((error?: unknown) => void) | null = null;
  private connection: WebSocket;

  constructor(private client: SpotifyClient) {
    super();
  }

  public state: SocketState = SocketState.IDLE;

  private setState(state: SocketState) {
    const oldState = this.state;
    this.state = state;
    this.emit('stateChanged', state, oldState);
  }

  public connect(): Promise<void> {
    assert(this.state === SocketState.IDLE);
    this.setState(SocketState.CONNECTING);

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
      url.searchParams.set('access_token', await this.client.options.authorizationStrategy.getAccessToken());

      this.connection = new WebSocket(url);
      this.connection.on('open', () => this.onSocketOpen());
      this.connection.on('error', (error) => this.onSocketError(error));
      this.connection.on('close', (code, reason) => this.onSocketClose(code, reason));
      this.connection.on('message', async (message) => {
        try {
          await this.onSocketMessage(message as Buffer);
        } catch (error) {
          this.connectResolve?.(error);
          console.error(error);
        }
      });
    });
  }

  private onSocketOpen(): void {
    this.setState(SocketState.CONNECTED);
  }

  private onSocketError(error: Error): void {
    this.connectResolve?.(error);
  }

  private onSocketClose(code: number, reason: Buffer): void {
    console.log('closed', code, reason.toString());
  }

  private onSocketMessage(data: Buffer): unknown {
    const payload: WebsocketMessage = JSON.parse(data.toString());

    if (payload.type !== WebsocketMessageType.Message) {
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

    this.emit('rawMessage', payload);
    for (const event of payload.payloads) {
      if (typeof event === 'string') {
        this.emit('rawSerializedEvent', payload, event);
        continue;
      }

      for (const payloadEvent of event.events) {
        this.emit('event', payloadEvent);
      }
    }
  }

  private async subscribe(message: WebsocketMessage): Promise<void> {
    const connectionID = message.headers['Spotify-Connection-Id']?.toString();
    assert(connectionID);
    assert(this.state === SocketState.CONNECTED);

    this.setState(SocketState.SUBSCRIBING);
    await setTimeout(2000);
    const response = await this.client.http.put<{ message?: string }>('me/notifications/player', {
      searchParams: { connection_id: connectionID },
      responseType: 'json',
    });

    if (response.body?.message !== 'Subscription created') {
      throw new Error('failed to subscribe');
    }

    this.setState(SocketState.SUBSCRIBED);
    this.connectResolve?.();
  }
}