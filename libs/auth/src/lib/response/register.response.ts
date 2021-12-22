import { Field, ObjectType } from '@nestjs/graphql';
import User from '../scalars/user';

@ObjectType()
export default class RegisterResponse {
  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
