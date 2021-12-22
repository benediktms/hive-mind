import { Response, Request } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    await this.authService.verifyAccessToken(req, res);
  }
}
