import { LikesMutation } from "../protobuf/likes-mutate.js";
import { Op_Added, Op_Kind, Op_Moved, Op_Removed, PlaylistMutate } from "../protobuf/playlist-mutate.js";
import { WebsocketEvent } from "../spotify-types/events/websocket-event";
import { SpotifyClient } from "./client";

export class ProtobufHandler {
  constructor(
    private client: SpotifyClient
  ) {
    client.on('rawProtobufEvent', this.onRawProtobufEvent.bind(this));
  }
  
  private onRawProtobufEvent(event: WebsocketEvent, payload: string): void {
    const url = new URL(event.uri);
    const buf = Buffer.from(payload, 'base64');
    if (url.pathname.startsWith('/v2/playlist/')) {
      const playlistMutate = PlaylistMutate.decode(buf);
      return this.handlePlaylistMutate(playlistMutate);
    }

    if (url.pathname.startsWith('/collection') && event.headers['Content-Type'] === 'application/octet-stream') {
      const likeMutation = LikesMutation.decode(buf);
      console.log(buf.toString('hex'));
      // console.log(likeMutation.likeItems[0].id.toS);
    }
  }

  private handlePlaylistMutate(playlistMutate: PlaylistMutate): void {
    for (const op of playlistMutate.ops) {
      switch (op.kind) {
        case Op_Kind.Add: {
          this.handlePlaylistAdd(playlistMutate, op.added!);
          break;
        }

        case Op_Kind.Remove: {
          this.handlePlaylistRemove(playlistMutate, op.removed!);
          break;
        }

        case Op_Kind.Move: {
          this.handlePlaylistMove(playlistMutate, op.moved!);
          break;
        }
      }
    }

  }

  private handlePlaylistAdd(event: PlaylistMutate, op: Op_Added): void {
    for (const item of op.items) {
      this.client.emit('playlistItemAdded', event.uri, item);
    }
  }

  private handlePlaylistRemove(event: PlaylistMutate, op: Op_Removed): void {
    for (const item of op.items) {
      this.client.emit('playlistItemRemoved', event.uri, item);
    }
  }

  private handlePlaylistMove(event: PlaylistMutate, op: Op_Moved): void {
    this.client.emit('playlistItemMoved', event.uri, op)
  }
}