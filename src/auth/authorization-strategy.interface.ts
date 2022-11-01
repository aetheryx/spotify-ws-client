import { Promisable } from 'type-fest';

export interface IAuthorizationStrategy {
  getAccessToken: () => Promisable<string>;
}
