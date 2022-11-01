import got from 'got';
import { load } from 'cheerio';
import * as z from 'zod';
import { IAuthorizationStrategy } from './authorization-strategy.interface';

type Session = z.infer<typeof Session>;
const Session = z.object({
  accessToken: z.string(),
  isAnonymous: z.literal(false),
  accessTokenExpirationTimestampMs: z.number(),
});

export class SpotifyAuthorizationStrategy implements IAuthorizationStrategy {
  constructor(
    private cookie: string,
  ) {}

  private session: Session;

  private async scrape(): Promise<Session> {
    const request = got.get('https://open.spotify.com', {
      headers: {
        cookie: this.cookie,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      },
    });

    const $ = load(await request.buffer());
    const sessionRaw = $('#session[type="application/json"]').html()!;
    return Session.parse(JSON.parse(sessionRaw));
  }

  public async getAccessToken(): Promise<string> {
    if (
      !this.session ||
      this.session.accessTokenExpirationTimestampMs < Date.now()
    ) {
      this.session = await this.scrape();
    }

    return this.session.accessToken;
  }
}
