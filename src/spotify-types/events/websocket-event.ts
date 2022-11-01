import { IncomingHttpHeaders } from 'node:http';
import { WebsocketPayloadEvent } from './websocket-payload-event';

export enum WebsocketEventType {
  Message = 'message',
}

export enum WebsocketPayloadType {
  PlayerStateChanged = 'PLAYER_STATE_CHANGED',
  DeviceStateChanged = 'DEVICE_STATE_CHANGED'
}

export interface WebsocketEvent {
  headers: IncomingHttpHeaders;
  type: WebsocketEventType,
  uri: string;
  payloads?: Array<WebsocketPayload | string>;
}

export interface WebsocketPayload {
  events: WebsocketPayloadEvent[];
}
