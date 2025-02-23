import { IncomingHttpHeaders } from 'node:http';
import { WebsocketPayloadEvent } from './websocket-payload-event';

export enum WebsocketMessageType {
  Message = 'message',
}

export enum WebsocketPayloadType {
  PlayerStateChanged = 'PLAYER_STATE_CHANGED',
  DeviceStateChanged = 'DEVICE_STATE_CHANGED'
}

export interface WebsocketMessage {
  headers: IncomingHttpHeaders;
  type: WebsocketMessageType;
  uri: string;
  payloads?: Array<WebsocketPayload | string>;
}

export interface WebsocketPayload {
  events: WebsocketPayloadEvent[];
}
