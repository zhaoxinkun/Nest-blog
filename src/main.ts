import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

// import Validator from './common/validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 关键一行：绑定 class-validator 的容器为 Nest 的容器
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // 设置全局管道：使用内置的 ValidationPipe 进行数据验证,打开transform即可自动转为dto

  app.useGlobalPipes(new ValidationPipe({
    transform: true, whitelist: true,
    forbidNonWhitelisted: true,
  }));
  // 当然了,我们也可以重写一下  common/validator
  // app.useGlobalPipes(new Validator());

  await app.listen(process.env.PORT ?? 3700);
}

bootstrap();
