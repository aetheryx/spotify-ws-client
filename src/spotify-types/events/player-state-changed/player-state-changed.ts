import { WebsocketPayloadType } from "../websocket-message";
import { GenericWebsocketPayloadEvent } from "../websocket-payload-event";
import { PlayerState } from './player-state';

interface PlayerStateChangedInner {
  state: PlayerState;
}

export type PlayerStateChangedEvent = GenericWebsocketPayloadEvent<WebsocketPayloadType.PlayerStateChanged, PlayerStateChangedInner>;
