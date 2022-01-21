import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import LoginInput from './dto/login.dto';
import RegisterInput from './dto/register.dto';
import LoginResponse from './response/login.response';
import RegisterResponse from './response/register.response';
import { Cookies, GraphQLContext } from '@grp-org/shared';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { LogoutResponse } from './response/logout.response';
import { CurrentUserResponse } from './response/current-user.response';

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
    const { accessToken, refreshToken, user } = await this.authService.register(
      input
    );

    this.authService.setTokens(context.res, accessToken, refreshToken);

    return new RegisterResponse(user, accessToken, refreshToken);
  }

  @Mutation(() => LoginResponse, {
    description: 'Allows the user to log in',
  })
  public async login(
    @Args('input') input: LoginInput,
    @Context() context: GraphQLContext
  ): Promise<LoginResponse> {
    const { accessToken, refreshToken, user } = await this.authService.login(
      input.email,
      input.password
    );

    this.authService.setTokens(context.res, accessToken, refreshToken);

    return new LoginResponse(`Welcome back, ${user.firstName}!`);
  }

  @Mutation(() => LogoutResponse)
  @UseGuards(GraphQLAuthGuard)
  public logout(@Context() { res }: GraphQLContext): LogoutResponse {
    this.authService.clearTokens(res);

    return new LogoutResponse('Logged out');
  }

  @Query(() => CurrentUserResponse)
  @UseGuards(GraphQLAuthGuard)
  public async currentUser(
    @Context() context: GraphQLContext
  ): Promise<CurrentUserResponse> {
    const { cookies } = context.req;
    const token: string = cookies[Cookies.AccessToken];
    const accessToken = this.authService.verifyAccessToken(token);

    const { id, email, firstName, lastName } =
      await this.authService.getUserById(accessToken.userId);

    return new CurrentUserResponse(id, email, firstName, lastName);
  }
}
