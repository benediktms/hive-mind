import { AccessTokenPayload, Cookies } from '@hive-mind/shared';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static extreactJWTFromCookie(req: Request): string | null {
    let token: string | null = null;

    if (req && req.cookies) token = req.cookies[Cookies.AccessToken];

    return token;
  }

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (req: Request) => JwtStrategy.extreactJWTFromCookie(req),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  public async validate(payload: AccessTokenPayload) {
    return await this.authService.validateUser(payload.userId);
  }
}
