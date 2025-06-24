import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '@/jwt/jwtAuth.guard';
import { AdminAuthDecorator } from '@/common/decorator/adminAuth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  // 注册
  @Post('register')
  register(@Body() createUserDto: CreateUserDto,) {
    return this.authService.register(createUserDto);
  }

  // 登录
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
    return req.user;
  }

  // 查询所有的用户
  @Get('allUsers')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @AdminAuthDecorator()
  getAllUsers() {
    return this.authService.findAll();
  }

}
