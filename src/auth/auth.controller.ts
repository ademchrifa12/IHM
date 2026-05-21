import { Controller, Post, Body, BadRequestException, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

export class RegisterDto {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  typeUtilisateur: string;
}

export class LoginDto {
  email: string;
  motDePasse: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    if (
      !registerDto.email ||
      !registerDto.motDePasse ||
      !registerDto.typeUtilisateur
    ) {
      throw new BadRequestException('Missing required fields');
    }

    // Note: Service d'enregistrement sera implémenté dans UserService
    return {
      message: 'User registered successfully',
      email: registerDto.email,
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.email || !loginDto.motDePasse) {
      throw new BadRequestException('Email and password are required');
    }

    // Note: Logique de connexion sera implémentée dans UserService
    return {
      accessToken: 'token_will_be_generated',
      refreshToken: 'refresh_token_will_be_generated',
    };
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body() body: { refreshToken: string }) {
    if (!body.refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const payload = this.authService.verifyRefreshToken(body.refreshToken);
      const newAccessToken = this.authService.generateAccessToken({
        id: payload.id,
        typeUtilisateur: payload.typeUtilisateur,
      });

      return { accessToken: newAccessToken };
    } catch {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
