"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireRoles = exports.REQUIRE_ROLES = exports.Public = exports.PUBLIC_ROUTE = void 0;
const common_1 = require("@nestjs/common");
exports.PUBLIC_ROUTE = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.PUBLIC_ROUTE, true);
exports.Public = Public;
exports.REQUIRE_ROLES = 'require_roles';
const RequireRoles = (...roles) => (0, common_1.SetMetadata)(exports.REQUIRE_ROLES, roles);
exports.RequireRoles = RequireRoles;
//# sourceMappingURL=roles.decorator.js.map