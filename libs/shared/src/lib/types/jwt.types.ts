export type JwtPayload = {
  userId: number;
  tokenVersion: number;
};

export interface AccessTokenPayload {
  userId: number;
}

export interface RefreshTokenPayload {
  userId: number;
  version: number;
}

export interface AccessToken extends AccessTokenPayload {
  exp: number;
}

export interface RefreshToken extends RefreshTokenPayload {
  exp: number;
}

export enum TokenExpiration {
  Access = 5 * 60,
  Refresh = 7 * 24 * 60 * 60,
  RefreshIfLessThan = 4 * 24 * 60 * 60,
}
