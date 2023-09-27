export interface TokenInfo {
  iat: number;
  exp: number;
  roles?: string[];
  username?: number;
  domain?: string;
  sub: number;
}

export interface AuthInfo {
  token: string;
  refreshToken: string;
  tokenInfo: TokenInfo;
}
