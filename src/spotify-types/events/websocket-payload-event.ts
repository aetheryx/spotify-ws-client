import { DeviceStateChangedEvent } from "./device-state-changed/device-state-changed";
import { PlayerStateChangedEvent } from "./player-state-changed/player-state-changed";
import { WebsocketPayloadType } from "./websocket-event";

export interface GenericWebsocketPayloadEvent<T extends WebsocketPayloadType = WebsocketPayloadType, E = Record<string, unknown>> {
  type: T;
  event: { event_id: number } & E;
  user: { id: string };
}

export type WebsocketPayloadEvent = 
  | PlayerStateChangedEvent
  | DeviceStateChangedEvent;
