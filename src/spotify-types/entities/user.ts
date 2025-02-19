import * as z from 'zod';
import { EntityType, entity } from './partials/entity.js';

export const User = entity(EntityType.User);
export type User = z.infer<typeof User>;
