import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../jwt/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  // @UseGuards(JwtAuthGuard)
  login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return this.authService.login(loginUserDto);
  }

  // 校验我们的token

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req: any) {
    return  req.user
  }

}
