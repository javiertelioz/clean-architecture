/**
 * Access Token Manager Interface
 */
export interface IAccessTokenManager {
  generate: (payload: string | Buffer | any) => string;
  decode: (token: string) => any;
}
