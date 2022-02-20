import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmEmailResponse {
  constructor(message: string) {
    this.message = message;
  }

  @Field()
  message: string;
}
