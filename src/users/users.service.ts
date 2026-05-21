import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';

export class CreateUserDto {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  typeUtilisateur: UserType;
  telephone?: string;
  adresse?: string;
}

export class UpdateUserDto {
  nom?: string;
  prenom?: string;
  telephone?: string;
  adresse?: string;
  biographie?: string;
  photoUrl?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'motDePasse'>> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await this.authService.hashPassword(
      createUserDto.motDePasse,
    );

    const user = this.usersRepository.create({
      ...createUserDto,
      motDePasse: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);

    // Remove password from response and add helper methods
    const { motDePasse, ...result } = savedUser;
    return {
      ...result,
      sInscrire: () => true,
      sAuthentifier: () => true,
    } as any;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { idUtilisateur: id },
      relations: ['clientProfile', 'prestaireProfile', 'adminProfile'],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'motDePasse'>> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);

    const { motDePasse, ...result } = updatedUser;
    return {
      ...result,
      sInscrire: () => true,
      sAuthentifier: () => true,
    } as any;
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.authService.comparePasswords(
      password,
      user.motDePasse,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async findByType(type: UserType): Promise<User[]> {
    return this.usersRepository.find({
      where: { typeUtilisateur: type, estActif: true },
    });
  }
}
