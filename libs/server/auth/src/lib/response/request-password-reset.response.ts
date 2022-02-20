import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@ObjectType()
export class RequestPasswordResetResponse {
  constructor(token: string, email: string) {
    this.token = token;
    this.email = email;
  }

  @Field()
  @IsString()
  @MinLength(21)
  token: string;

  @Field()
  @IsEmail()
  email: string;
}
