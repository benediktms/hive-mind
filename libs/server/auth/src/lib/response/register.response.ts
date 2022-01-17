import { Field, ObjectType } from '@nestjs/graphql';
import User from '../models/user';

@ObjectType()
export default class RegisterResponse {
  constructor(user: User, accessToken: string, refreshToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
