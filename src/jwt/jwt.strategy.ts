//jwt.strategy.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });

    console.log('我草泥马的比', jwtConstants.secret);
  }


  // 解析策略
  async validate(payload: any) {
    // 拿到我们的token,他会自己解析的
    console.log('payload is ', payload);
    const findUser = await this.prisma.user.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (!findUser) {
      throw new HttpException('user is not found', HttpStatus.NOT_FOUND);
    }

    return { name: payload.name, password: payload.password };
  }
}