import { GraphQLAuthGuard } from '@grp-org/auth';
import { UseGuards } from '@nestjs/common';
import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@UseGuards(GraphQLAuthGuard)
export class CoreResolver {
  @Query(() => Float)
  uptime() {
    return process.uptime();
  }
}
