import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    // 配置读取env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 配置prisma模块
    PrismaModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
