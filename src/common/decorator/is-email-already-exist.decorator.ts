import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsEmailAlreadyExist } from '../validators/is-email-already-exist.validator';

export function IsEmailAlreadyExistDecorator(validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUserAlreadyExist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsEmailAlreadyExist,
    });
  };
}