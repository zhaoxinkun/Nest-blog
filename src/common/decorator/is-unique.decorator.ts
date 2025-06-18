import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '../validators/is-unique.validator';


// validationOptions用来支持 { message: ... } 等选项传入
export function IsUniqueDecorator(field: string, model: string, validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUserAlreadyExist',
      target: object.constructor, //class-validator 用来关联 class 元数据
      propertyName, //当前这个字段名，比如 email
      options: validationOptions,
      validator: IsUniqueConstraint, //指定验证器类（必须是实现了 ValidatorConstraintInterface 的）
      constraints: [{ field, model }],  //是你传给验证器类的“自定义参数”
    });
  };
}