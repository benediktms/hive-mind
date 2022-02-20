import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class ResetPasswordResponse {
  constructor(message: string) {
    this.message = message;
  }

  @Field()
  @IsString()
  message!: string;
}
