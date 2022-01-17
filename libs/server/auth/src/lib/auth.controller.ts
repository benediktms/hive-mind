import { Response, Request } from 'express';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.authService.verifyAccessToken(req, res);
  }
}
