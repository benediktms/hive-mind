import { Response } from 'express';
import { Controller, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies } from '@grp-org/shared';
import { DataService } from '@grp-org/server-data';
import { ReqCookies } from './decorators/cookies.decorator';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly dataService: DataService
  ) {}

  @Post('refresh_token')
  async refreshToken(
    @ReqCookies(Cookies.RefreshToken) token: string,
    @Res() res: Response
  ): Promise<void> {
    Logger.log('refreshToken', 'AuthController');

    try {
      const current = this.authService.verifyRefreshToken(token);

      const user = await this.dataService.user.findUnique({
        where: { id: current.userId },
      });

      if (!user) throw new Error('User not found');

      const { accessToken, refreshToken } = this.authService.refreshTokens(
        current,
        user.refreshTokenVersion
      );

      this.authService.setTokens(res, accessToken, refreshToken);

      res.send();
    } catch (e) {
      this.authService.clearTokens(res);
    }

    res.end();
  }
}
