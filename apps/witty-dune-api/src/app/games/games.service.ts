import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);

  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  @ApiOkResponse({ description: 'Games retrieved successfully.' })
  public findAll(): Promise<Game[]> {
    this.logger.log('Returning all games.');
    return this.gameModel.find().exec();
  }

  @ApiOkResponse({ description: 'Game retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Game not found.' })
  public findOne(id: string): Promise<Game> {
    this.logger.log(`Attempting to return game with id: ${id}.`);
    const game = this.gameModel.findById(id).exec();

    if (!game) {
      this.logger.log(`No game with id: ${id} found.`);
      throw new NotFoundException('Game not found.');
    }

    this.logger.log(`Returning game with id: ${id}.`);
    return game;
  }

  @ApiCreatedResponse({ description: 'Game created successfully.' })
  public async create(game: Game): Promise<Game> {
    this.logger.log(`Attempting to create new game with name: ${game.name}.`);

    const blogGame: Game = {
      ...game,
    };

    this.logger.log(`Creating new game.`);
    this.gameModel.create(blogGame);

    return blogGame;
  }

  @ApiOkResponse({ description: 'Game deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Game not found.' })
  public async delete(id: string): Promise<void> {
    this.logger.log(`Attempting to delete game with id: ${id}.`);
    const res = await this.gameModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException('Game not found.');
    this.logger.log(`Deleting game with id: ${id}.`);
    this.gameModel.remove(id);
  }

  @ApiOkResponse({ description: 'Game updated successfully.' })
  @ApiNotFoundResponse({ description: 'Game not found.' })
  public async update(id: string, game: Game): Promise<Game> {
    this.logger.log(`Attempting to update game with id: ${id}.`);
    const blogGame: Game = {
      ...game,
    };
    const res = await this.gameModel.findByIdAndUpdate(id, blogGame);
    if (res == null) throw new NotFoundException('Game not found.');
    this.logger.log(`Updating game with id: ${id}.`);

    return blogGame;
  }
}
