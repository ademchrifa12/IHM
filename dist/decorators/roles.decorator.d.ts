import { UserType } from '../entities/user.entity';
export declare const PUBLIC_ROUTE = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const REQUIRE_ROLES = "require_roles";
export declare const RequireRoles: (...roles: UserType[]) => import("@nestjs/common").CustomDecorator<string>;
