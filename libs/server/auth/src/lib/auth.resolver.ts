import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import LoginInput from './dto/login.dto';
import RegisterInput from './dto/register.dto';
import LoginResponse from './response/login.response';
import RegisterResponse from './response/register.response';
import { GraphQLContext } from '@grp-org/shared';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import User from './models/user';
import { LogoutResponse } from './response/logout.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse, {
    description: 'Registers a new User',
  })
  public async register(
    @Args('input') input: RegisterInput,
    @Context() context: GraphQLContext
  ): Promise<RegisterResponse> {
    const registerRes = await this.authService.register(input);

    this.authService.sendAccessToken(context.res, registerRes.token);

    return registerRes;
  }

  @Mutation(() => LoginResponse, {
    description: 'Allows the user to log in',
  })
  public async login(
    @Args('input') input: LoginInput,
    @Context() context: GraphQLContext
  ): Promise<LoginResponse> {
    const registerRes = await this.authService.login(
      input.email,
      input.password
    );

    this.authService.sendAccessToken(context.res, registerRes.token);

    return registerRes;
  }

  @Mutation(() => LogoutResponse)
  @UseGuards(GraphQLAuthGuard)
  public async logout(@CurrentUser() user: User): Promise<LogoutResponse> {
    await this.authService.revokeRefreshToken(user.id);

    return new LogoutResponse('Logged out successfully');
  }

  @Query(() => User)
  @UseGuards(GraphQLAuthGuard)
  public async currentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
