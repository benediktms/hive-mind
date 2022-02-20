import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  token!: string;
}
