import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IsUserAlreadyExist } from '@/common/validators/is-user-already-exist.validator';
import { IsEmailAlreadyExist } from '@/common/validators/is-email-already-exist.validator';
import { IsUniqueConstraint } from '@/common/validators/is-unique.validator';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/jwt/constants';
import { JwtStrategy } from '@/jwt/jwt.strategy';
import * as process from 'node:process';
import { MyClassDecorator } from '@/common/decorator/class.decorator';


@Module({
  imports: [
    // 导入签发token模块
    PassportModule,
    JwtModule.register({
      // 签名密钥
      secret: jwtConstants.secret,
      // 一些配置项,如过期时间(注意格式)
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || 5000,
      },
    }),
  ],
  providers: [
    AuthService,
    // 使用自定义用户唯一性验证器
    IsUserAlreadyExist,
    // 使用自定义邮箱唯一性验证器
    IsEmailAlreadyExist,
    IsUniqueConstraint,
    JwtStrategy,
  ],
  controllers: [AuthController],
})

@MyClassDecorator()
export class AuthModule {
}
