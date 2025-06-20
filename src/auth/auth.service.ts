import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import *  as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/jwt/constants';

@Injectable()
export class AuthService {
  constructor(
    // 构造器注入prisma
    private readonly prisma: PrismaService,
    // 注入jwt
    private jwtService: JwtService,
  ) {
  }

  // 按照用户名查找是否存在
  async findUserByName(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }

  // 用户注册
  async register(createUserDto: CreateUserDto) {

    // 先查询数据库,防止重复注册
    // 这里使用我们的自定义dto验证装饰器完成了,所以这一步去其实不用了
    // const findUser = await this.findUserByName(createUserDto.name);
    // if (findUser) {
    //   throw new HttpException('user already exists', HttpStatus.CONFLICT);
    // }

    // 用户密码加密存储
    const salt = await bcrypt.genSalt(10);

    // 创建用户
    const createUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: await bcrypt.hash(createUserDto.password, salt),  //加密密码
        email: createUserDto.email || null,
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Created user successfully',
      user: createUser,
    };
  }

  // 用户登录
  async login(loginUserDto: LoginUserDto) {

    // 查询是否存在
    const findUser = await this.findUserByName(loginUserDto.name);
    if (!findUser) {
      throw new HttpException('user is not found', HttpStatus.NOT_FOUND);
    }

    // 解密密码
    const isPasswordMatch = await bcrypt.compare(loginUserDto.password, findUser.password);

    // 判断密码错误
    if (!isPasswordMatch) {
      throw new HttpException('password is not correct', HttpStatus.UNAUTHORIZED);
    }

    // 签发token
    const payload = {
      sub: findUser.id,
      name: findUser.name,
    };

    // 这里做打印测试
    console.log(jwtConstants.secret, payload);

    return {
      status: HttpStatus.OK,
      message: 'Login successfully',
      name: `Login name is ${loginUserDto.name}`,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      payload: payload,
      user: {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
      },
    };

  }


}