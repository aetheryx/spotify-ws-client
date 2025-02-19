import * as z from 'zod';
import { EntityType, entity } from './partials/entity';

export const Artist = entity(EntityType.Artist)
  .extend({
    name: z.string(),
  });
