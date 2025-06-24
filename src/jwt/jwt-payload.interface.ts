import { Role } from '@/common/enum/role.enum';

export interface JwtPayload {
  sub: number;
  name: string;
  roles: Role[]; // ['admin', 'user']
}