import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import LoginResponse from './response/login.response';
import RegisterResponse from './response/register.response';
import { GraphQLContext } from '@grp-org/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse, {
    description: 'Registers a new User',
  })
  public async register(
    @Args('input') input: RegisterDto,
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
    @Args('input') input: LoginDto,
    @Context() context: GraphQLContext
  ): Promise<LoginResponse> {
    const registerRes = await this.authService.login(
      input.email,
      input.password
    );

    this.authService.sendAccessToken(context.res, registerRes.token);

    return registerRes;
  }
}
