import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
// import { NotFoundArticleInterceptor } from '@/common/interceptor/not-found-article.interceptor';

// @UseInterceptors(NotFoundArticleInterceptor)
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  // 创建文章
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  // 查询所有
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  // 分页查询
  @Get('row')
  findRow(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.articleService.paginate(+page, +limit);
  }

  // 查询id文章
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  // 更新id 文章  局部更新
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  // 删除id文章
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
