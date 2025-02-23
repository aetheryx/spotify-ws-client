import { PlayerRepeatState, PlayerState, PlayerStateChangedEvent } from "../../spotify-types/events/player-state-changed";
import { WebsocketPayloadType } from "../../spotify-types/events/websocket-message.js";
import { WebsocketPayloadEvent } from "../../spotify-types/events/websocket-payload-event.js";
import { TypedEventEmitter } from "../../util/typed-event-emitter.js";
import { SpotifyClient } from "../client";

type PlayerEvents = {
  stateChanged: [state: PlayerState, oldState: PlayerState | null];

  volumeChanged: [volume: number, oldVolume: number];
  shuffleChanged: [shuffle: boolean];
  repeatChanged: [repeat: PlayerRepeatState, oldRepeat: PlayerRepeatState];
  isPlayingChanged: [isPlaying: boolean];
  itemChanged: [item: PlayerState['item'], oldItem: PlayerState['item']];
  progressChanged: [progress: number, oldProgress: number];
}

export class PlayerModule extends TypedEventEmitter<PlayerEvents> {
  public playerState: PlayerState | null = null;

  constructor(
    private client: SpotifyClient
  ) {
    super();
    this.client.socket.on('event', this.onEvent.bind(this));
  }

  private onEvent(event: WebsocketPayloadEvent) {
    switch (event.type) {
      case WebsocketPayloadType.PlayerStateChanged:
        return this.onPlayerStateChanged(event.event);
    }
  }

  private onPlayerStateChanged({ state }: PlayerStateChangedEvent['event']) {
    const old = this.playerState;

    this.emit('stateChanged', state, old);
    if (old !== null) {
      this.diffPlayerState(state, old);
    }

    this.playerState = state;
  }

  private diffPlayerState(newState: PlayerState, oldState: PlayerState): void {
    if (newState.device.volume_percent !== oldState.device.volume_percent) {
      this.emit('volumeChanged', newState.device.volume_percent, oldState.device.volume_percent);
      return;
    }

    if (newState.shuffle_state !== oldState.shuffle_state) {
      this.emit('shuffleChanged', newState.shuffle_state);
      return;
    }

    if (newState.repeat_state !== oldState.repeat_state) {
      this.emit('repeatChanged', newState.repeat_state, oldState.repeat_state);
      return;
    }

    if (newState.is_playing !== oldState.is_playing) {
      this.emit('isPlayingChanged', newState.is_playing);
      return;
    }

    if (
      newState.item?.id && oldState.item?.id &&
      newState.item.id !== oldState.item.id
    ) {
      this.emit('itemChanged', newState.item, oldState.item);
      return;
    }

    if (newState.progress_ms !== oldState.progress_ms) {
      this.emit('progressChanged', newState.progress_ms, oldState.progress_ms);
      return;
    }
  }
}