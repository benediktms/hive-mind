import { Response, Request } from 'express';
import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies, CurrentUser } from '@grp-org/shared';
import { DataService } from '@grp-org/server-data';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly dataService: DataService
  ) {}

  @Post('refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    Logger.log('refreshToken', 'AuthController');

    try {
      const current = this.authService.verifyRefreshToken(
        req.cookies[Cookies.RefreshToken]
      );

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
      const error = new UnauthorizedException('Unauthorized');
      Logger.log(error);
      throw error;
    }
  }

  @Get('me')
  async me(@Req() req: Request, @Res() res: Response) {
    Logger.log('me', 'AuthController');
    try {
      const token = this.authService.verifyAccessToken(
        req.cookies[Cookies.AccessToken]
      );

      const user = await this.dataService.user.findUnique({
        where: { id: token.userId },
      });

      if (!user) throw new Error('User not found');

      const userRes: CurrentUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      Logger.log('me', 'AuthController', userRes, token);

      return res
        .json({
          user: userRes,
          token: req.cookies[Cookies.AccessToken],
        })
        .send();
    } catch (e) {
      const error = new UnauthorizedException('Unauthorized');
      Logger.log(error);
      throw error;
    }
  }
}
