import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsInt } from 'class-validator';

@ObjectType()
export class CurrentUserResponse {
  constructor(id: number, email: string, firstName: string, lastName: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Field()
  @IsInt()
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
