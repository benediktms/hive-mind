import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CollectiveService } from './collective.service';
import {
  CreateCollectiveInput,
  CreateCollectiveResponse,
} from './dto/create-collective.dto';
import { CurrentUser, GraphQLAuthGuard } from '@hive-mind/server-auth';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class CollectiveResolver {
  constructor(private readonly collectiveService: CollectiveService) {}

  @Mutation(() => CreateCollectiveResponse, {
    description:
      'Create a new collective. The creator will automatically be the first admin',
  })
  public async createCollective(
    @CurrentUser() user: User,
    @Args('input') input: CreateCollectiveInput
  ) {
    const res = await this.collectiveService.createCollective(user, input);

    return res;
  }
}
