import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { UsersService, CreateUserDto, UpdateUserDto } from './users.service';
import { JwtAuthGuard, Roles } from '../auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.motDePasse ||
      !createUserDto.nom ||
      !createUserDto.prenom
    ) {
      throw new BadRequestException('Missing required fields');
    }

    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const { motDePasse, ...result } = user;
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
  }

  @Get('type/:type')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  async findByType(@Param('type') type: string) {
    return this.usersService.findByType(type as any);
  }
}
