import * as z from 'zod';

export const ExternalURLs = z.object({
  external_urls: z.record(z.string()),
});

export const ExternalIDs = z.object({
  external_ids: z.record(z.string()),
});
