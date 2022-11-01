import * as z from 'zod';

export const Image = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string().url(),
});
