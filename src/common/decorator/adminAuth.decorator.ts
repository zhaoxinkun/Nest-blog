import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface Role {
  ADMIN: 'admin';
}

export function AdminAuthDecorator(...roles: Role[]) {

  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt')));

}