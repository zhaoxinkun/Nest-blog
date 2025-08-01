import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;
  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;
  @IsNotEmpty({
    message: '栏目名不能为空',
  })
  categoryId: number;
}
