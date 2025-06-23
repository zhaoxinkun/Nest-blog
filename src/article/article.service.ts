import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {

  constructor(
    // 配置读取env
    private config: ConfigService,
    private readonly prisma: PrismaService) {
  }

  // 创建文章
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId,
      },
    });
  }

  // 查询所有
  findAll() {
    return this.prisma.article.findMany();
  }

  // 分页查询
  async paginate(page: number = 1, limit: number) {

    // 跳过多少条
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.prisma.article.count(),
      this.prisma.article.findMany({
        skip,
        take: limit,
        // take:this.config.get('ARTICLE_PAGE_ROW', 10) : 10
        orderBy: { id: 'asc' },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    }
      ;


  }

  // 查询id文章
  async findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  // 更新id 文章  局部更新
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id,
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
      },
    });
  }

  // 删除id文章
  async remove(id: number) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
