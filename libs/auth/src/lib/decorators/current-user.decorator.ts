import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data, ctx) => GqlExecutionContext.create(ctx).getContext().req.user
);
