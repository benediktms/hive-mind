import { IsBoolean, IsJWT } from 'class-validator';

export class VerifyTokenResponse {
  constructor(ok: boolean, accessToken: string) {
    this.ok = ok;
    this.accessToken = accessToken;
  }

  @IsBoolean()
  ok: boolean;

  @IsJWT()
  accessToken: string;
}
