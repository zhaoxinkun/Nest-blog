import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    // 配置prisma模块
    PrismaModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
