import * as z from 'zod';
import { Track } from './track';

export const Item = z.discriminatedUnion('type', [
  Track,
])