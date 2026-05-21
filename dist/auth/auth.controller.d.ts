import { AuthService } from './auth.service';
export declare class RegisterDto {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    typeUtilisateur: string;
}
export declare class LoginDto {
    email: string;
    motDePasse: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        email: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
    }>;
}
