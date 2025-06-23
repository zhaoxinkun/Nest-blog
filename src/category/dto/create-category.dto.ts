import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

}
