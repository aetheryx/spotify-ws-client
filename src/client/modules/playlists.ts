import { LikesMutation } from "../../protobuf/likes-mutation.js";
import { PlaylistMutation } from "../../protobuf/playlist-mutation.js";
import { WebsocketMessage } from "../../spotify-types/events/websocket-message";
import { TypedEventEmitter } from "../../util/typed-event-emitter.js";
import { SpotifyClient } from "../client";

type PlaylistsEvents = {
  playlistMutation: [mutation: PlaylistMutation];
  likesMutation: [mutation: LikesMutation];
}

export class PlaylistsModule extends TypedEventEmitter<PlaylistsEvents> {
  constructor(private client: SpotifyClient) {
    super();

    client.socket.on('rawSerializedEvent', this.onRawSerializedEvent.bind(this));
  }

  private onRawSerializedEvent(message: WebsocketMessage, data: string) {
    const url = new URL(message.uri);
    if (url.protocol !== 'hm:') {
      return;
    }

    const target = url.hostname + url.pathname;
    if (
      target === `collection/collection/${this.client.user.id}` &&
      message.headers['Content-Type'] === 'application/octet-stream'
    ) {
      const likesMutation = LikesMutation.decode(Buffer.from(data, 'base64'));
      this.emit('likesMutation', likesMutation);
      return;
    }

    if (target.startsWith('playlist/v2/playlist')) {
      const playlistMutate = PlaylistMutation.decode(Buffer.from(data, 'base64'));
      this.emit('playlistMutation', playlistMutate);
      return;
    }
  }
}