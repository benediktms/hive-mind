import { Field, ObjectType } from '@nestjs/graphql';
import User from '../entities/user.entity';

@ObjectType()
export default class LoginResponse {
  constructor(message: string, user: User) {
    this.message = message;
    this.user = user;
  }

  @Field()
  message: string;

  @Field(() => User)
  user: User;
}
