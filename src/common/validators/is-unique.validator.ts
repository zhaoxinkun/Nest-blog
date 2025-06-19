import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

interface IsUniqueConstraintPayload {
  field: string;
  model: string;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

  constructor(private readonly prisma: PrismaService) {
  }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {

    console.log(args);

    // constraints是装饰器传来的参数
    console.log(args.constraints);


    const { field, model } = await args.constraints[0] as IsUniqueConstraintPayload;

    const result = await this.prisma[model].findFirst({
      where: {
        [field]: value,
      },
    });

    return !result;
  }

  // 配置默认消息
  defaultMessage(args: ValidationArguments): string {
    const { field } = args.constraints[0] as IsUniqueConstraintPayload;
    return `${field} 已经存在`;
  }

}