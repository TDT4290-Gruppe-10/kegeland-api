import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  return req.switchToHttp().getRequest().user.user_id as string;
});