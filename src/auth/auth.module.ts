import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IsUserAlreadyExist } from '../common/validators/is-user-already-exist.validator';
import { IsEmailAlreadyExist } from '../common/validators/is-email-already-exist.validator';
import { IsUniqueConstraint } from '../common/validators/is-unique.validator';

@Module({
  imports: [],
  providers: [
    AuthService,
    // 使用自定义用户唯一性验证器
    IsUserAlreadyExist,
    // 使用自定义邮箱唯一性验证器
    IsEmailAlreadyExist,
    IsUniqueConstraint,
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
