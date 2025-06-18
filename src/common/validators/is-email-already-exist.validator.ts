// 自定义邮箱验证的唯一性验证器类
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';


@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {

  constructor(private readonly prisma: PrismaService) {
  }


  // 实现方法
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    console.log(args);
    // targetName: 'CreateUserDto',
    // property: 'name',
    // object: CreateUserDto { name: 'JackOne', password: '123456789' },
    // value: 'JackOne',
    // constraints: undefined

    const email = await this.prisma.user.findUnique({
      where: {
        email: value,
      },
    });


    return !email;
  }

  // 配置默认消息
  defaultMessage(args: ValidationArguments): string {
    return `User  email with name ${args.value} already exists`;
  }
}