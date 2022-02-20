import { Response } from 'express';
import { Controller, Logger, Post, Res } from '@nestjs/common';
import { Cookies } from '@hive-mind/shared';
import { DataService } from '@hive-mind/server-data';
import { ReqCookies } from './decorators/cookies.decorator';
import { TokenService } from './token.service';

@Controller()
export class AuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly dataService: DataService
  ) {}

  @Post('refresh_token')
  async refreshToken(
    @ReqCookies(Cookies.RefreshToken) token: string,
    @Res() res: Response
  ): Promise<void> {
    Logger.log('refreshToken', 'AuthController');

    try {
      const current = this.tokenService.verifyRefreshToken(token);

      const user = await this.dataService.user.findUnique({
        where: { id: current.userId },
      });

      if (!user) throw new Error('User not found');

      const { accessToken, refreshToken } = this.tokenService.refreshTokens(
        current,
        user.refreshTokenVersion
      );

      this.tokenService.setTokens(res, accessToken, refreshToken);

      res.send();
    } catch (e) {
      this.tokenService.clearTokens(res);
    }

    res.end();
  }
}
