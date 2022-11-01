import * as z from 'zod';
import { ExternalURLs } from '../../../entities/partials/external';

export const PlayerContext = z.object({ // todo
  href: z.string(),
  type: z.string(),
  uri: z.string(),
})
  .merge(ExternalURLs);
