import { User } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { LogoutResponse } from './response/logout.response';

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class LogoutResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LogoutResponse)
  public async logout(@CurrentUser() user: User): Promise<LogoutResponse> {
    await this.authService.revokeRefreshToken(user.id);

    return new LogoutResponse('Logged out successfully');
  }
}
