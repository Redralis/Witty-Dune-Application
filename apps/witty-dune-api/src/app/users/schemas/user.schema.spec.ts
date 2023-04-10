import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { User, UserDocument, UserSchema } from './user.schema';

describe('User Schema', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<UserDocument>;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  const user = {
    _id: '64319dee47c3413030e067cd',
    username: 'Redralis',
    password: 'test',
    firstname: 'Lucas',
    lastname: 'de Kleijn',
    email: 'l.dekleijn2@student.avans.nl',
    dateofbirth: '2003-01-27T00:00:00.000Z',
    country: 'Netherlands',
    following: [],
    profilepic:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    __v: 0,
  };

  it('has a required username', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.username).toBeInstanceOf(Error);
  });

  it('should have a unique username', async () => {
    const model = new userModel(user);
    await model.save();

    const duplicate = new userModel(user);
    await expect(duplicate.save()).rejects.toThrow();
  });

  it('has a required firstname', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.firstname).toBeInstanceOf(Error);
  });

  it('has a required lastname', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.lastname).toBeInstanceOf(Error);
  });

  it('has a required email', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.email).toBeInstanceOf(Error);
  });

  it('has a required dateofbirth', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.dateofbirth).toBeInstanceOf(Error);
  });
  
  it('has a required country', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.country).toBeInstanceOf(Error);
  });

  it('has a required profilepic', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.profilepic).toBeInstanceOf(Error);
  });
});
