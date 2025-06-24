// 自定义方法装饰器
export function MyMethodDecorator(): MethodDecorator {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target); //{}
    console.log(propertyKey); //login
    console.log(descriptor); //
  };
}