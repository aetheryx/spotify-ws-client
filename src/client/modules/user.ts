import { User } from "../../spotify-types/entities/user.js";
import { SpotifyClient } from "../client";

export class UserModule {
  public user: User | null = null;

  constructor(private client: SpotifyClient) {}

  public get id(): string | null {
    return this.user?.id ?? null;
  }

  public async init(): Promise<void> {
    const response = await this.client.http.get('me', {
      responseType: 'json',
    });

    this.user = User.parse(response.body);
  }
}