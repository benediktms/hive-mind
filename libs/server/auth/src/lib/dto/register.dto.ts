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
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsNotEmpty()
  password!: string;

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
