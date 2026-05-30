import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUserPayload {
  sub: number;
  email: string;
  role: 'CLIENT' | 'PRESTATAIRE' | 'ADMIN';
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthUserPayload => {
    return ctx.switchToHttp().getRequest().user;
  },
);
