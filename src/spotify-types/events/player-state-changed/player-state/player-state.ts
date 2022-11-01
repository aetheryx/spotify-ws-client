import * as z from 'zod';
import { PlayerContext } from './player-context';
import { Track } from '../../../entities/track';
import { PlayerDevice } from './player-device';

export enum PlayerCurrentlyPlayingType {
  Track = 'track',
  Episode = 'episode',
  Ad = 'ad',
  Unknown = 'unknown',
}

export enum PlayerRepeatState {
  Track = 'track',
  Context = 'context',
  Off = 'off'
}

export const PlayerState = z.object({
  device: PlayerDevice,
  context: PlayerContext,
  item: Track, // todo
  progress_ms: z.number(),
  currently_playing_type: z.nativeEnum(PlayerCurrentlyPlayingType),
  repeat_state: z.nativeEnum(PlayerRepeatState),
  timestamp: z.number(),
  is_playing: z.boolean(),
  shuffle_state: z.boolean(),
  actions: z.object({}), // todo
});

export type PlayerState = z.infer<typeof PlayerState>;

// import { Track } from './entities/track.interface';
// import { WebsocketInnerEvent } from './websocket-inner-event.interface';

// export interface PlayerStateChangedEvent extends WebsocketInnerEvent<'PLAYER_STATE_CHANGED'> {
//   event: {
//     event_id: number;
//     state: PlayerState;
//   };
// }

// const PlayerState = z.object({});

// type PlayerAction =
//   | 'interrupting_playback'
//   | 'pausing'
//   | 'resuming'
//   | 'seeking'
//   | 'skipping_next'
//   | 'skipping_prev'
//   | 'toggling_repeat_context'
//   | 'toggling_shuffle'
//   | 'toggling_repeat_track'
//   | 'transferring_playback';
// interface PlayerActions {
//   disallows: Partial<Record<PlayerAction, boolean>>;
// }
