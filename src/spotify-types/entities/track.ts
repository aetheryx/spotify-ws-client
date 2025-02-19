import * as z from 'zod';
import { Album } from './album';
import { Artist } from './artist';
import { EntityType, entity } from './partials/entity';
import { ExternalURLs } from './partials/external';
import { ExternalIDs } from './partials/external';

export const Track = entity(EntityType.Track)
  .merge(ExternalURLs)
  .merge(ExternalIDs)
  .extend({
    album: Album,
    name: z.string(),
    artists: z.array(Artist),
    duration_ms: z.number(),
    explicit: z.boolean(),
    is_local: z.boolean(),
    is_playable: z.boolean(),
    popularity: z.boolean(),
    preview_url: z.string().url(),
    track_number: z.number(),
  });
