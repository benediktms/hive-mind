import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class LoginResponse {
  constructor(message: string) {
    this.message = message;
  }

  @Field()
  message!: string;
}
