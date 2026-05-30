import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Client } from '../../entities/client.entity';
import { Prestataire } from '../../entities/prestataire.entity';
import { RefreshToken } from '../../entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole, StatutValidation } from '../../common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Client) private readonly clients: Repository<Client>,
    @InjectRepository(Prestataire) private readonly prestataires: Repository<Prestataire>,
    @InjectRepository(RefreshToken) private readonly refreshTokens: Repository<RefreshToken>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    if (dto.role === UserRole.ADMIN) {
      throw new BadRequestException("Création d'administrateur interdite via l'inscription publique.");
    }
    const exists = await this.users.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Cette adresse e-mail est déjà utilisée.');

    const motDePasse = await bcrypt.hash(dto.motDePasse, 10);
    const user = await this.users.save(
      this.users.create({
        nom: dto.nom,
        prenom: dto.prenom,
        email: dto.email,
        motDePasse,
        role: dto.role,
      }),
    );

    if (dto.role === UserRole.CLIENT) {
      await this.clients.save(this.clients.create({ user }));
    } else if (dto.role === UserRole.PRESTATAIRE) {
      await this.prestataires.save(
        this.prestataires.create({ user, statutValidation: StatutValidation.EN_ATTENTE }),
      );
    }

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Identifiants invalides.');
    const ok = await bcrypt.compare(dto.motDePasse, user.motDePasse);
    if (!ok) throw new UnauthorizedException('Identifiants invalides.');
    return this.issueTokens(user);
  }

  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token invalide ou expiré.');
    }
    const hash = await bcrypt.hash(refreshToken, 1).catch(() => '');
    const stored = await this.refreshTokens.find({
      where: { user: { idUser: payload.sub }, revoked: false },
      relations: ['user'],
    });
    const match = await this.findMatching(stored, refreshToken);
    if (!match) throw new UnauthorizedException('Refresh token révoqué.');

    match.revoked = true;
    await this.refreshTokens.save(match);
    return this.issueTokens(match.user);
  }

  async logout(userId: number) {
    await this.refreshTokens.update({ user: { idUser: userId } }, { revoked: true });
    return { message: 'Déconnexion réussie.' };
  }

  // ---------- privé ----------
  private async findMatching(tokens: RefreshToken[], raw: string) {
    for (const t of tokens) {
      if (await bcrypt.compare(raw, t.tokenHash)) return t;
    }
    return null;
  }

  private async issueTokens(user: User) {
    const payload = { sub: user.idUser, email: user.email, role: user.role };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES') ?? '15m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES') ?? '7d',
    });
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.refreshTokens.save(
      this.refreshTokens.create({ user, tokenHash, expiresAt }),
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.idUser,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    };
  }
}
