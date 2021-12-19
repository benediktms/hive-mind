import { Field, ObjectType } from '@nestjs/graphql';
import User from '../models/user';

@ObjectType()
export default class LoginResponse {
  constructor(user: User) {
    this.user = user;
  }

  @Field(() => User)
  user: User;
}
