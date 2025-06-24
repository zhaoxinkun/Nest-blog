import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: 'username is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'username is required',
  })
  password: string;


  @IsOptional()
  email: string | null;

  @IsNotEmpty({
    message: 'role is required',
  })
  role: string;
}