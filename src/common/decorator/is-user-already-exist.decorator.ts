import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUserAlreadyExist } from '../validators/is-user-already-exist.validator';

export function IsUserAlreadyExistDecorator(validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'IsUserAlreadyExist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsUserAlreadyExist,
    });
  };
}