import { WebsocketPayloadType } from "../websocket-event";
import { GenericWebsocketPayloadEvent } from "../websocket-payload-event";
import { PlayerState } from './player-state';

interface PlayerStateChangedInner {
  state: PlayerState;
}

export type PlayerStateChangedEvent = GenericWebsocketPayloadEvent<WebsocketPayloadType.PlayerStateChanged, PlayerStateChangedInner>;
