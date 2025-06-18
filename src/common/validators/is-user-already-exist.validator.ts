// is-user-already-exist.validator.ts
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {

  // 这里我们拿到prisma,获取用户
  constructor(private readonly prisma: PrismaService) {
  }

  // 传一个name即可
  async validate(name: string, args: ValidationArguments) {
    console.log(`你现在验证的用户是${args.value}`);

    // 查询用户
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    return !user;// true 表示验证通过（即不存在），false 表示验证失败（存在）
  }

  // 配置默认消息
  defaultMessage(args: ValidationArguments): string {
    return `User with name ${args.value} already exists`;
  }
}