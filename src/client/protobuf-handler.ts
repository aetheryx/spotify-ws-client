import { LikesMutation } from "../protobuf/likes-mutate.js";
import { Op_Added, Op_Kind, Op_Moved, Op_Removed, PlaylistMutate } from "../protobuf/playlist-mutate.js";
import { WebsocketEvent } from "../spotify-types/events/websocket-event";
import { SpotifyClient } from "./client";
import { BigNumber } from 'bignumber.js';

const SpotifyB62 = BigNumber.clone({
  ALPHABET: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
});

export class ProtobufHandler {
  constructor(
    private client: SpotifyClient
  ) {
    client.on('rawProtobufEvent', this.onRawProtobufEvent.bind(this));
  }
  
  private onRawProtobufEvent(event: WebsocketEvent, payload: string): void {
    const url = new URL(event.uri);
    const buf = Buffer.from(payload, 'base64');

    if (
      url.pathname === `/collection/${this.client.selfUser?.id}` &&
      event.headers['Content-Type'] === 'application/octet-stream'
    ) {
      const likesMutation = LikesMutation.decode(buf);
      return this.handleLikeMutation(likesMutation);
    }

    if (url.pathname.startsWith('/v2/playlist/')) {
      const playlistMutate = PlaylistMutate.decode(buf);
      return this.handlePlaylistMutate(playlistMutate);
    }
  }

  private handleLikeMutation(likeMutation: LikesMutation): void {
    for (const likeItem of likeMutation.likeItems) {
      const b62 = new SpotifyB62(Buffer.from(likeItem.id).toString('hex'), 16);
      const id = b62.toString(62);
      if (likeItem.removed) {
        this.client.emit('itemUnliked', id);
      } else {
        this.client.emit('itemLiked', id);
      }
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