export declare const APP_CONSTANTS: {
    PASSWORD_MIN_LENGTH: number;
    PASSWORD_REGEX: RegExp;
    DEFAULT_PAGE_SIZE: number;
    MAX_PAGE_SIZE: number;
    MIN_RATING: number;
    MAX_RATING: number;
    RESERVATION_VALID_BEFORE_DAYS: number;
    MESSAGES: {
        UNAUTHORIZED: string;
        FORBIDDEN: string;
        NOT_FOUND: string;
        CONFLICT: string;
        BAD_REQUEST: string;
        INTERNAL_ERROR: string;
    };
    ROLES: {
        ADMIN: string;
        CLIENT: string;
        PRESTATAIRE: string;
    };
    RESERVATION_STATUS: {
        PENDING: string;
        ACCEPTED: string;
        REJECTED: string;
        COMPLETED: string;
        CANCELLED: string;
    };
};
export declare const JWT_CONFIG: {
    secret: string | undefined;
    expiresIn: string;
    refreshSecret: string | undefined;
    refreshExpiresIn: string;
};
export declare const DB_CONFIG: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string | undefined;
    database: string;
    synchronize: boolean;
    logging: boolean;
};
export declare const CORS_CONFIG: {
    origin: string;
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];
};
export declare const SECURITY_CONFIG: {
    bcryptRounds: number;
    jwtAlgorithm: string;
    corsCheckOrigin: boolean;
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
};
