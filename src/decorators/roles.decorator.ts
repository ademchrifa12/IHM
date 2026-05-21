import { SetMetadata } from '@nestjs/common';
import { UserType } from '../entities/user.entity';

export const PUBLIC_ROUTE = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_ROUTE, true);

export const REQUIRE_ROLES = 'require_roles';
export const RequireRoles = (...roles: UserType[]) =>
  SetMetadata(REQUIRE_ROLES, roles);
