import * as z from 'zod';
import { Image } from './image';
import { Artist } from './artist';
import { EntityType, entity } from './partials/entity';
import { ReleaseDate } from './partials/release-date';
import { ExternalURLs } from './partials/external';

export enum AlbumType {
  Album = 'album',
  Single = 'single',
  Compilation = 'compilation',
}

export const Album = entity(EntityType.Album)
  .merge(ReleaseDate)
  .merge(ExternalURLs)
  .extend({
    album_type: z.nativeEnum(AlbumType),
    images: z.array(Image),
    artists: z.array(Artist),
    total_tracks: z.number(),
    popularity: z.number(),
    is_playable: z.boolean(),
    album_group: z.unknown(), // todo
  });
