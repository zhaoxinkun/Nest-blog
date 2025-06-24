// src/common/guards/roles.guard.ts
import { CanActivate, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Reflector } from '@nestjs/core';
import { Role } from '@/common/enum/role.enum';
import { ROLES_KEY } from '@/common/decorator/roles.decorator';
import { JwtPayload } from '@/jwt/jwt-payload.interface';

@Injectable()
// 自定义守卫
export class RolesGuard implements CanActivate {

  // 用来读取元信息
  constructor(private reflector: Reflector) {
  }

  // 实现守卫方法
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),// 方法上的装饰器
      context.getClass(),// 控制器上的装饰器
    ]);
    if (!requiredRoles) {
      return true; // 没有设置角色，直接放行
    }

    //这依赖于 JwtAuthGuard 先执行，将用户解码信息注入到 request.user
    // 获取你请求的user信息
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;
    console.log('User from JWT:', user);

    // return requiredRoles.some((role) => user.roles?.includes(role));
    if (!user || !user.roles) {
      return false; // 如果user或roles没了，直接拒绝
    }

    //✅ 判断当前用户是否具备至少一个被要求的角色
    const hasRole = requiredRoles.some(role => user.roles.includes(role));
    console.log('Has required role:', hasRole);
    return hasRole;
  }

}