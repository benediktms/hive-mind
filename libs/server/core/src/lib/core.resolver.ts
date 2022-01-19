import { GraphQLAuthGuard } from '@grp-org/server-auth';
import { UseGuards } from '@nestjs/common';
import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class CoreResolver {
  @Query(() => Float)
  // uptime(@CurrentUser() _user: User) {
  uptime() {
    return process.uptime();
  }
}
