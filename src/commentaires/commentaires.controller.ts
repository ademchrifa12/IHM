import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { CommentairesService } from './commentaires.service';
import { CreateCommentaireDto, UpdateCommentaireDto } from '../dto';
import { JwtAuthGuard, Roles } from '../auth/jwt-auth.guard';

@Controller('api/commentaires')
export class CommentairesController {
  constructor(private commentairesService: CommentairesService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    return this.commentairesService.findAll(parseInt(limit), parseInt(offset));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentairesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(['client'])
  @HttpCode(201)
  async create(@Body() createCommentaireDto: CreateCommentaireDto) {
    if (!createCommentaireDto.note || !createCommentaireDto.contenu) {
      throw new BadRequestException('Missing required fields');
    }

    return this.commentairesService.create(createCommentaireDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['client'])
  async update(
    @Param('id') id: string,
    @Body() updateCommentaireDto: UpdateCommentaireDto,
  ) {
    return this.commentairesService.update(id, updateCommentaireDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['client', 'admin'])
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.commentairesService.delete(id);
  }

  @Get('service/:idService')
  async findByService(@Param('idService') idService: string) {
    return this.commentairesService.findByService(idService);
  }

  @Get('service/:idService/rating')
  async getServiceRating(@Param('idService') idService: string) {
    return this.commentairesService.getServiceRating(idService);
  }

  @Get('client/:idClient')
  @UseGuards(JwtAuthGuard)
  async findByClient(@Param('idClient') idClient: string) {
    return this.commentairesService.findByClient(idClient);
  }

  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  @Roles(['admin'])
  async toggleVisibility(
    @Param('id') id: string,
    @Body() body: { visible: boolean },
  ) {
    if (body.visible === undefined) {
      throw new BadRequestException('Visibility status is required');
    }

    return this.commentairesService.toggleVisibility(id, body.visible);
  }

  @Post(':id/report')
  @UseGuards(JwtAuthGuard)
  async reportComment(@Param('id') id: string) {
    return this.commentairesService.reportComment(id);
  }
}
