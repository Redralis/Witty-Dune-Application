import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { Post, PostDocument, PostSchema } from './post.schema';

describe('Post Schema', () => {
  let mongod: MongoMemoryServer;
  let postModel: Model<PostDocument>;

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
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
      ],
    }).compile();

    postModel = app.get<Model<PostDocument>>(getModelToken(Post.name));

    await postModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('has a required postedBy', () => {
    const model = new postModel();

    const err = model.validateSync();

    expect(err.errors.postedBy).toBeInstanceOf(Error);
  });

  it('has a required title', () => {
    const model = new postModel();

    const err = model.validateSync();

    expect(err.errors.title).toBeInstanceOf(Error);
  });

  it('has a required content', () => {
    const model = new postModel();

    const err = model.validateSync();

    expect(err.errors.content).toBeInstanceOf(Error);
  });

  it('has a required publicationdate', () => {
    const model = new postModel();

    const err = model.validateSync();

    expect(err.errors.publicationdate).toBeInstanceOf(Error);
  });
});
