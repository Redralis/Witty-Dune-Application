import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

  @Post()
  public async create(@Body() game: Game): Promise<Game> {
    return this.gamesService.create(game);
  }

  @Delete(':id')
  public delete(@Param('id') id: string): void {
    this.gamesService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() game: Game
  ): Promise<Game> {
    return this.gamesService.update(id, game);
  }
}
