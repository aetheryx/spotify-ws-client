import * as z from 'zod';

export const PlayerDevice = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  is_active: z.boolean(),
  is_private_session: z.boolean(),
  is_restricted: z.boolean(),
  volume_percent: z.number(), // todo
});

export type PlayerDevice = z.infer<typeof PlayerDevice>;
