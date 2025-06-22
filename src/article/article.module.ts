import { Module, UseInterceptors } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { NotFoundArticleInterceptor } from '@/common/interceptor/not-found-article.interceptor';

@UseInterceptors(NotFoundArticleInterceptor)
@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {
}
