// // import { DeviceState } from "../spotify-types/events/device-state-changed/device-state";
// // import { DeviceStateChangedEvent } from "../spotify-types/events/device-state-changed/device-state-changed";
// // import { PlayerState, PlayerStateChangedEvent } from "../spotify-types/events/player-state-changed";
// // import { WebsocketEvent, WebsocketPayloadType } from "../spotify-types/events/websocket-event.js";
// import { WebsocketPayloadEvent } from "../spotify-types/events/websocket-payload-event";
// import { SpotifyClient } from "./client.js";

// export class StateHandler {
//   // public playerState: PlayerState | null = null;
//   // public deviceState: DeviceState | null = null;

//   constructor(
//     private client: SpotifyClient
//   ) {
//     // client.on('rawEvent', this.onRawEvent.bind(this));
//   }

//   // private onRawEvent(event: WebsocketPayloadEvent): void {
//   //   switch (event.type) {
//   //     case WebsocketPayloadType.PlayerStateChanged:
//   //       return this.onPlayerStateChanged(event);

//   //     case WebsocketPayloadType.DeviceStateChanged:
//   //       return this.onDeviceStateChanged(event);
//   //   }

//   //   console.log('unkn', event);
//   // }

//   // private onPlayerStateChanged({ event: { state } }: PlayerStateChangedEvent) {
//   //   const old = this.playerState;
//   //   if (old) {
//   //     this.diffPlayerState(state);
//   //   }

//   //   this.client.emit('playerStateChanged', state, old);
//   //   this.playerState = state;
//   // }

//   // private diffPlayerState(playerState: PlayerState): void {
//   //   const old = this.playerState!;
//   //   if (playerState.device.id !== old.device.id) {
//   //     this.client.emit('playerDeviceChanged', playerState.device, old.device);
//   //     return;
//   //   }
//   // }

//   // private onDeviceStateChanged({ event }: DeviceStateChangedEvent) {
//   //   const old = this.deviceState;
//   //   this.client.emit('deviceStateChanged', event, old);
//   //   this.deviceState = old;
//   // }
// }