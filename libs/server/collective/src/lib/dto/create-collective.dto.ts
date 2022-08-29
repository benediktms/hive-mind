import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CollectiveFeatures } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { Collective } from '../entities/collective.entity';

@InputType()
export class CreateCollectiveInput {
  @Field()
  @IsString()
  collectiveName!: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  // TODO: this should be an enum validation but prisma does not generate enums
  features!: CollectiveFeatures[];
}

@ObjectType()
export class CreateCollectiveResponse {
  @Field(() => Collective)
  collective!: Collective;
}
