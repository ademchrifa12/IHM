import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateAccessToken(payload: any): string;
    generateRefreshToken(payload: any): string;
    verifyToken(token: string): any;
    verifyRefreshToken(token: string): any;
}
