import { Args, Mutation, Resolver } from '@nestjs/graphql';
import AuthService from './auth.service';
import LoginDTO from './dto/login.dto';
import RegisterDTO from './dto/register.dto';
import LoginResponse from './response/login.response';
import RegisterResponse from './response/register.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse, {
    description: 'Registers a new User',
  })
  public async register(@Args('input') input: RegisterDTO) {
    return await this.authService.register(input);
  }

  @Mutation(() => LoginResponse, {
    description: 'Allows the user to log in',
  })
  public async login(@Args('input') input: LoginDTO) {
    return await this.authService.login(input.email, input.password);
  }
}

// TODO
// @Mutation()
// public async logout() {
//   throw new Error('unimplemented');
// }
// }
