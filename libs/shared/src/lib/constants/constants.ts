export enum Cookies {
  AccessToken = '_grp_access',
  RefreshToken = '_grp_refresh',
}

export enum TokenExpiration {
  Access = 5 * 60,
  Refresh = 7 * 24 * 60 * 60,
  RefreshIfLessThan = 4 * 24 * 60 * 60,
}
