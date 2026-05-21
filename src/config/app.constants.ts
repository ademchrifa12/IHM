/**
 * Constantes d'application
 */

export const APP_CONSTANTS = {
  // Validation
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // Ratings
  MIN_RATING: 1,
  MAX_RATING: 5,

  // Réservations
  RESERVATION_VALID_BEFORE_DAYS: 7,

  // Messages
  MESSAGES: {
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access denied',
    NOT_FOUND: 'Resource not found',
    CONFLICT: 'Conflict - Resource already exists',
    BAD_REQUEST: 'Invalid request data',
    INTERNAL_ERROR: 'Internal server error',
  },

  // Roles
  ROLES: {
    ADMIN: 'admin',
    CLIENT: 'client',
    PRESTATAIRE: 'prestataire',
  },

  // Reservation Status
  RESERVATION_STATUS: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  },
};

/**
 * Configuration JWT
 */
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRATION || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
};

/**
 * Configuration Database
 */
export const DB_CONFIG = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'a_domicile_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.DB_LOGGING === 'true',
};

/**
 * Configuration CORS
 */
export const CORS_CONFIG = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

/**
 * Configuration Sécurité
 */
export const SECURITY_CONFIG = {
  bcryptRounds: 10,
  jwtAlgorithm: 'HS256',
  corsCheckOrigin: true,
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },
};
