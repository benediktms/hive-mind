import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import LoginInput from './dto/login.dto';
import RegisterInput from './dto/register.dto';
import LoginResponse from './response/login.response';
import RegisterResponse from './response/register.response';
import { Cookies, GraphQLContext } from '@hive-mind/shared';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from './guards/graphql-auth.guard';
import { LogoutResponse } from './response/logout.response';
import { CurrentUserResponse } from './response/current-user.response';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { ConfirmEmailInput } from './dto/confirm-email.dto';
import { ConfirmEmailResponse } from './response/confirm-email.response';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

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

    this.tokenService.setTokens(context.res, accessToken, refreshToken);

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

    this.tokenService.setTokens(context.res, accessToken, refreshToken);

    return new LoginResponse(`Welcome back, ${user.firstName}!`);
  }

  @Mutation(() => LogoutResponse)
  @UseGuards(GraphQLAuthGuard)
  public logout(@Context() { res }: GraphQLContext): LogoutResponse {
    this.tokenService.clearTokens(res);

    return new LogoutResponse('Logged out');
  }

  @Query(() => CurrentUserResponse)
  @UseGuards(GraphQLAuthGuard)
  public async currentUser(
    @Context() context: GraphQLContext
  ): Promise<CurrentUserResponse> {
    const { cookies } = context.req;
    const token: string = cookies[Cookies.AccessToken];
    const accessToken = this.tokenService.verifyAccessToken(token);

    const { id, email, firstName, lastName } =
      await this.userService.getUserById(accessToken.userId);

    return new CurrentUserResponse(id, email, firstName, lastName);
  }

  @Mutation(() => ConfirmEmailResponse)
  public async confirmEmail(@Args('input') input: ConfirmEmailInput) {
    await this.authService.confirmEmail(input.email);

    return new ConfirmEmailResponse('Email confirmed');
  }
}
