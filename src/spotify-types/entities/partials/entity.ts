import * as z from 'zod';

export enum EntityType {
  Album = 'album',
  Artist = 'artist',
  Track = 'track',
}

export const entity = <const T extends EntityType>(type: T) => z.object({
  type: z.literal(type),
  name: z.string(),
  id: z.string().nullable(),
  uri: z.string().nullable(),
  href: z.string().nullable(),
});
