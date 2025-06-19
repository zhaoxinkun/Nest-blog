import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import *  as bcrypt from 'bcryptjs';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
  }

  // 按照用户名查找是否存在
  async findUserByName(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }

  // 用户注册
  async register(createUserDto: CreateUserDto) {

    // 先查询数据库,防止重复注册
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
        email: createUserDto.email,
      },
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Created user successfully',
      user: createUser,
    };
  }

  async login(loginUserDto: LoginUserDto) {

    const findUser = await this.findUserByName(loginUserDto.name);
    if (!findUser) {
      throw new HttpException('user is not found', HttpStatus.NOT_FOUND);
    }

    // 解密密码
    const isPasswordMatch = await bcrypt.compare(loginUserDto.password, findUser.password);

    if (!isPasswordMatch) {
      throw new HttpException('password is not correct', HttpStatus.UNAUTHORIZED);
    }

    return {
      status: HttpStatus.OK,
      message: 'Login successfully',
      name: `Login name is ${loginUserDto.name}`,
    };

  }


}