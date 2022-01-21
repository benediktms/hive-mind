import { Request, Response } from 'express';

export type GraphQLContext = {
  req: Request;
  res: Response;
};
