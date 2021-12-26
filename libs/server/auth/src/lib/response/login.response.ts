import { Field, ObjectType } from '@nestjs/graphql';
import User from '../models/user';

@ObjectType()
export default class LoginResponse {
  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
