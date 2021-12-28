import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponse {
  constructor(message: string) {
    this.message = message;
  }

  @Field()
  message: string;
}
