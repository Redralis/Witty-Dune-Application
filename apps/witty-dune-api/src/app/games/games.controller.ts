import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';

@Controller('games')
@ApiTags('Games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  public findAll(): Promise<Array<Game>> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() game: Game) {
    return await this.gamesService.create(game);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public delete(@Param('id') id: string): void {
    this.gamesService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public update(@Param('id') id: string, @Body() game: Game): Promise<Game> {
    return this.gamesService.update(id, game);
  }
}
