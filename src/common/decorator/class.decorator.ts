// 自定义类装饰器

export function MyClassDecorator(): ClassDecorator {
  return function(target) {
    // 可以给类添加元数据
    Reflect.defineMetadata('custom:tag', 'myValue', target);

    console.log(`装饰器应用在类: ${target.name}`);
    console.log(target.name);
    console.log(target.prototype);
  };
}