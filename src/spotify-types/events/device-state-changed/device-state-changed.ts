import { WebsocketPayloadType } from "../websocket-event";
import { GenericWebsocketPayloadEvent } from "../websocket-payload-event";
import { DeviceState } from "./device-state";

export type DeviceStateChangedEvent = GenericWebsocketPayloadEvent<WebsocketPayloadType.DeviceStateChanged, DeviceState>;
