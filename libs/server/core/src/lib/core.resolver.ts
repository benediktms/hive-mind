import { CurrentUser, GraphQLAuthGuard } from '@grp-org/server-auth';
import { UseGuards } from '@nestjs/common';
import { Float, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class CoreResolver {
  @Query(() => Float)
  uptime(@CurrentUser() _user: User) {
    return process.uptime();
  }
}
