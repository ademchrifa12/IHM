"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECURITY_CONFIG = exports.CORS_CONFIG = exports.DB_CONFIG = exports.JWT_CONFIG = exports.APP_CONSTANTS = void 0;
exports.APP_CONSTANTS = {
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    MIN_RATING: 1,
    MAX_RATING: 5,
    RESERVATION_VALID_BEFORE_DAYS: 7,
    MESSAGES: {
        UNAUTHORIZED: 'Unauthorized access',
        FORBIDDEN: 'Access denied',
        NOT_FOUND: 'Resource not found',
        CONFLICT: 'Conflict - Resource already exists',
        BAD_REQUEST: 'Invalid request data',
        INTERNAL_ERROR: 'Internal server error',
    },
    ROLES: {
        ADMIN: 'admin',
        CLIENT: 'client',
        PRESTATAIRE: 'prestataire',
    },
    RESERVATION_STATUS: {
        PENDING: 'pending',
        ACCEPTED: 'accepted',
        REJECTED: 'rejected',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
    },
};
exports.JWT_CONFIG = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
};
exports.DB_CONFIG = {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'a_domicile_db',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.DB_LOGGING === 'true',
};
exports.CORS_CONFIG = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
exports.SECURITY_CONFIG = {
    bcryptRounds: 10,
    jwtAlgorithm: 'HS256',
    corsCheckOrigin: true,
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    },
};
//# sourceMappingURL=app.constants.js.map