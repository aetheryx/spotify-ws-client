import * as z from 'zod';

export enum ReleaseDatePrecision {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export const ReleaseDate = z.object({
  release_date: z.string(),
  release_date_precision: z.nativeEnum(ReleaseDatePrecision),
});
