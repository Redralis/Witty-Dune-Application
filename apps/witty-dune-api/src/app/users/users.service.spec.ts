import { Test } from '@nestjs/testing';

import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';

import { UsersService } from './users.service';
import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { Neo4jService } from '../neo/neo4j.service';

import { ObjectId } from 'mongodb';

describe('UsersService', () => {
  let service: UsersService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UsersService,
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<UsersService>(UsersService);

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await userModel.ensureIndexes();

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe('ensuring a user exists', () => {
    var _id;
    it('should create a user if it does not exist', async () => {
      const user = {
        username: 'Redralis',
        password: 'test',
        firstname: 'Lucas',
        lastname: 'de Kleijn',
        email: 'l.dekleijn2@student.avans.nl',
        dateofbirth: new Date('2003-01-27T00:00:00.000Z'),
        country: 'Netherlands',
        following: null,
        profilepic:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      };

      await service.create(user);

      const results = await mongoc
        .db('test')
        .collection('users')
        .find({})
        .toArray();

      const userWithIdAnd__vAndHashedPassword = {
        ...user,
        _id: results[0]._id,
        __v: results[0].__v,
        password: results[0].password,
      };

      _id = results[0]._id;

      expect(results[0]).toEqual(userWithIdAnd__vAndHashedPassword);
      expect(results).toHaveLength(1);
    });

    it('should not create a user if it exists', async () => {
      const user = {
        username: 'Redralis',
        password: 'test',
        firstname: 'Lucas',
        lastname: 'de Kleijn',
        email: 'l.dekleijn2@student.avans.nl',
        dateofbirth: new Date('2003-01-27T00:00:00.000Z'),
        country: 'Netherlands',
        following: null,
        profilepic:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      };

      await mongoc.db('test').collection('users').insertOne({});

      await service.create(user);

      const results = await mongoc
        .db('test')
        .collection('users')
        .find({})
        .toArray();

      expect(results).toHaveLength(2);
    });
  });
});
