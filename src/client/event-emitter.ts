// import EventEmitter from 'node:events';
// // import { State } from './client';
// // import { WebsocketEvent } from '../spotify-types/events/websocket-event';
// // import { WebsocketPayloadEvent } from '../spotify-types/events/websocket-payload-event';
// // import { PlayerDevice, PlayerRepeatState, PlayerState } from '../spotify-types/events/player-state-changed';
// // import { DeviceState } from '../spotify-types/events/device-state-changed/device-state';
// // import { Item, Op_Moved } from '../protobuf/playlist-mutate';

// interface Events {
//   // stateChanged: [newState: State, oldState: State];

//   // rawWebsocketEvent: [event: WebsocketEvent];
//   // rawEvent: [event: WebsocketPayloadEvent];
//   // rawProtobufEvent: [event: WebsocketEvent, payload: string];

//   // playerStateChanged: [playerState: PlayerState, oldPlayerState: PlayerState | null];
//   // deviceStateChanged: [deviceState: DeviceState, oldDeviceState: DeviceState | null];

//   // playerDeviceChanged: [device: PlayerDevice, oldDevice: PlayerDevice];

//   // playlistItemAdded: [playlistURI: string, item: Item];
//   // playlistItemRemoved: [playlistURI: string, item: Item];
//   // playlistItemMoved: [playlistURI: string, moved: Op_Moved];

//   // itemLiked: [itemID: string];
//   // itemUnliked: [itemID: string];

//   // deviceAdded: [device: PlayerDevice];
//   // deviceRemoved: [device: PlayerDevice];
// }

// export class TypedEventEmitter extends EventEmitter {
//   public declare on: <K extends keyof Events>(eventName: K, listener: (...args: Events[K]) => void) => this;
//   public declare emit: <K extends keyof Events>(eventName: K, ...args: Events[K]) => boolean;
// }
