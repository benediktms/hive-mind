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
