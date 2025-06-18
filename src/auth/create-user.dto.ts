import { IsNotEmpty, Length } from 'class-validator';
import { IsEmailAlreadyExistDecorator } from '../common/decorator/is-email-already-exist.decorator';
import { IsUserAlreadyExistDecorator } from '../common/decorator/is-user-already-exist.decorator';

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
  @IsUserAlreadyExistDecorator({ message: 'user is already exists' })
  name: string;


  @IsNotEmpty({
    message: 'password is required',
  })
  @Length(3, 12, {
    message: 'password is min3 and max12',
  })
  password: string;


  @IsNotEmpty({
    message: 'email is required',
  })
  // 使用自定义验证器类
  // @Validate(IsEmailAlreadyExist)
  // 使用自定义验证装饰器
  @IsEmailAlreadyExistDecorator({ message: 'email is already exists' })
  email: string;
}