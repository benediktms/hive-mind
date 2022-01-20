import { Response } from 'express';
import {
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies, CurrentUser } from '@grp-org/shared';
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

  @Get('me')
  async me(
    @ReqCookies(Cookies.AccessToken) token: string,
    @Res() res: Response
  ) {
    Logger.log('me', 'AuthController');
    try {
      const accessToken = this.authService.verifyAccessToken(token);

      const user = await this.dataService.user.findUnique({
        where: { id: accessToken.userId },
      });

      if (!user) throw new Error('User not found');

      const userRes: CurrentUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      res.send(userRes);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
