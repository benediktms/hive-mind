import { CtxUser, GraphQLAuthGuard } from '@grp-org/auth';
import { Logger, UseGuards } from '@nestjs/common';
import { Float, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class CoreResolver {
  @Query(() => Float)
  uptime(@CtxUser() user: User) {
    Logger.log(user);
    return process.uptime();
  }
}
