import { Test } from '@nestjs/testing';

import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';

import { GamesService } from './games.service';
import { Game, GameSchema, GameDocument } from './schemas/game.schema';
import { User, UserSchema, UserDocument } from '../users/schemas/user.schema';

describe('GameService', () => {
  let service: GamesService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  let gameModel: Model<GameDocument>;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    let uri: string;

    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [GamesService],
    }).compile();

    service = app.get<GamesService>(GamesService);

    gameModel = app.get<Model<GameDocument>>(getModelToken(Game.name));
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await gameModel.ensureIndexes();
    await userModel.ensureIndexes();

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('games').deleteMany({});
    await mongoc.db('test').collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('should give all games', async () => {
    const testGames = [
      {
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo',
      },
      {
        name: 'Escape from Tarkov',
        description:
          'Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security "USEC" and the Battle Encounter Assault Regiment "BEAR"). Players join matches called "raids" in which they fight other players and bots for loot and aim to survive and escape.',
        releasedate: new Date('2016-08-04T00:00:00.000Z'),
        logo: 'https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg',
      },
    ];

    await mongoc.db('test').collection('games').insertMany(testGames);

    const results = await service.findAll();

    expect(results[0].toObject()).toEqual(testGames[0]);
    expect(results[1].toObject()).toEqual(testGames[1]);
    expect(results).toHaveLength(2);
    expect(results[0]).toHaveProperty('_id');
    expect(results[0]).toHaveProperty('__v');
  });

  describe('ensuring a game exists', () => {
    var _id;
    it('should create a game if it does not exist', async () => {
      const game = {
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo',
      };

      await service.create(game);

      const results = await mongoc
        .db('test')
        .collection('games')
        .find({})
        .toArray();

      const gameWithIdAnd__v = {
        ...game,
        _id: results[0]._id,
        __v: results[0].__v,
      };

      _id = results[0]._id;

      expect(results[0]).toEqual(gameWithIdAnd__v);
      expect(results).toHaveLength(1);
    });

    it('should not create a game if it exists', async () => {
      const game = {
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo',
      };

      await mongoc.db('test').collection('games').insertOne({});

      await service.create(game);

      const results = await mongoc
        .db('test')
        .collection('games')
        .find({})
        .toArray();

      expect(results).toHaveLength(2);
    });
  });

  describe('finding a game by id', () => {
    var _id;
    it('should return a game if it exists', async () => {
      const game = {
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo',
      };

      await mongoc.db('test').collection('games').insertOne(game);

      const results = await mongoc
        .db('test')
        .collection('games')
        .find({})
        .toArray();

      _id = results[0]._id;

      const foundGame = await service.findOne(_id);

      expect(foundGame.toJSON()).toEqual(results[0]);
    });

    it('should return null if it does not exist', async () => {
      const foundGame = await service.findOne(_id);

      expect(foundGame).toBeNull();
    });
  });

  describe('finding deleting a game by id', () => {
    var _id;
    it('should delete a game if it exists', async () => {
      const game = {
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo',
      };

      await mongoc.db('test').collection('games').insertOne(game);

      const results = await mongoc
        .db('test')
        .collection('games')
        .find({})
        .toArray();

      _id = results[0]._id;

      await service.delete(_id);

      const foundGame = await service.findOne(_id);

      expect(foundGame).toBeNull();
    });
  });

  describe('finding updating a game by id', () => {
    var _id;
    it('should update a game if it exists', async () => {
      const game = {
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo',
      };

      await mongoc.db('test').collection('games').insertOne(game);

      const results = await mongoc
        .db('test')
        .collection('games')
        .find({})
        .toArray();

      _id = results[0]._id;

      const update = {
        _id: _id,
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: new Date('2018-11-16T00:00:00.000Z'),
        logo: 'examplelogo2',
      };

      await service.update(_id, update);

      const foundGame = await service.findOne(_id);

      expect(foundGame.toJSON()).toEqual(update);
    });
  });
});
