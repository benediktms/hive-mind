import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export default class RegisterInput {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  passwordConfirmation!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @IsAlpha()
  firstName!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @IsAlpha()
  lastName!: string;
}
