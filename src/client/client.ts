import { IAuthorizationStrategy } from "../auth/authorization-strategy.interface";
import got from "got";
import { SocketModule } from "./modules/socket.js";
import { UserModule } from "./modules/user.js";
import { PlayerModule } from "./modules/player.js";
import { PlaylistsModule } from "./modules/playlists.js";

export interface SpotifyClientOptions {
  authorizationStrategy: IAuthorizationStrategy;
  baseURL?: string;
}

export class SpotifyClient {
  public socket = new SocketModule(this);
  public user = new UserModule(this);
  public player = new PlayerModule(this);
  public playlists = new PlaylistsModule(this);

  public http = got.extend({
    prefixUrl: 'https://api.spotify.com/v1',
    hooks: {
      beforeRequest: [
        async (options) => {
          options.headers.authorization ??= `Bearer ${await this.options.authorizationStrategy.getAccessToken()}`;
        },
      ],
    },
  });

  constructor(
    public options: SpotifyClientOptions
  ) {
  }

  public async connect(): Promise<void> {
    await this.socket.connect();
    await this.user.init();
  }
}