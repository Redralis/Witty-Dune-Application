import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { Game, GameDocument, GameSchema } from './game.schema';

describe('Game Schema', () => {
  let mongod: MongoMemoryServer;
  let gameModel: Model<GameDocument>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
      ],
    }).compile();

    gameModel = app.get<Model<GameDocument>>(getModelToken(Game.name));

    await gameModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  const game = {
    _id: '63921105733608daad199357',
    name: 'Among Us',
    description:
      'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
    releasedate: '2018-11-16T00:00:00.000Z',
    logo: 'examplelogo',
    __v: 0,
  };

  it('has a required name', () => {
    const model = new gameModel();

    const err = model.validateSync();

    expect(err.errors.name).toBeInstanceOf(Error);
  });

  it('should have a unique name', async () => {
    const model = new gameModel(game);
    await model.save();

    const duplicate = new gameModel(game);
    await expect(duplicate.save()).rejects.toThrow();
  });

  it('has a required description', () => {
    const model = new gameModel();

    const err = model.validateSync();

    expect(err.errors.description).toBeInstanceOf(Error);
  });

  it('has a required releasedate', () => {
    const model = new gameModel();

    const err = model.validateSync();

    expect(err.errors.releasedate).toBeInstanceOf(Error);
  });

  it('has a required logo', () => {
    const model = new gameModel();

    const err = model.validateSync();

    expect(err.errors.logo).toBeInstanceOf(Error);
  });
});
