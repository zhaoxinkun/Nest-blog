import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 自定义参数装饰器
export const MyParamDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(data);
    console.log(ctx);
    return request.user;
  });