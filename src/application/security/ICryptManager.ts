/**
 * Access Token Manager Interface
 */
export interface ICryptManager {
  hash: (data: string) => string;
  compare: (plain: string, hashed: string) => boolean;
}
