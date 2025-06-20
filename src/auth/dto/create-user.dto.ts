import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { IsUniqueDecorator } from '@/common/decorator/is-unique.decorator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'username is required',
  })
  @Length(3, 12, {
    message: 'username is min3 and max12',
  })
  // 使用自定义验证器类
  // @Validate(IsUserAlreadyExist)
  // 使用自定义验证装饰器
  // @IsUserAlreadyExistDecorator({ message: 'user is already exists' })
  @IsUniqueDecorator('name', 'user', { message: 'user is already exists' })
  name: string;


  @IsNotEmpty({
    message: 'password is required',
  })
  @Length(3, 12, {
    message: 'password is min3 and max12',
  })
  password: string;


  // 使用自定义验证器类
  // @Validate(IsEmailAlreadyExist)
  // 使用自定义验证装饰器
  // @IsEmailAlreadyExistDecorator({ message: 'email is already exists' })
  // 使用我自己的通用的装饰器
  @IsOptional()
  @IsUniqueDecorator('email', 'user', { message: 'email is already existsXXXX' })
  email: string;
}