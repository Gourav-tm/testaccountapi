import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): { id, username, accountId } => {
    const req = ctx.switchToHttp().getRequest();
    const { id, username, accountId } = req.user;
    return { id, username, accountId };
  },
);
