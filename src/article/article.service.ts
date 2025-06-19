import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticleService {

  constructor(private readonly prisma: PrismaService) {
  }

  create(createArticleDto: CreateArticleDto) {

    return createArticleDto;
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return updateArticleDto;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
