import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class RegisterResponse {
  constructor(message: string) {
    this.message = message;
  }

  @Field()
  message: string;
}
