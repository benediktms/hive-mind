import { Response, Request } from 'express';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies } from '@grp-org/shared';
import { DataService } from '@grp-org/server-data';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly dataService: DataService
  ) {}

  @Post('refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
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
    } catch (e) {
      this.authService.clearTokens(res);
    }
  }
}
