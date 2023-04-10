import { Test } from '@nestjs/testing';

import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model, disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';

import { PostsService } from './posts.service';
import { Post, PostSchema, PostDocument } from './schemas/post.schema';
import { Game, GameSchema, GameDocument } from '../games/schemas/game.schema';
import { User, UserSchema, UserDocument } from '../users/schemas/user.schema';
import { Neo4jService } from '../neo/neo4j.service';

describe('PostsService', () => {
  let service: PostsService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  let postModel: Model<PostDocument>;
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
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
      ],
      providers: [
        PostsService,
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<PostsService>(PostsService);

    postModel = app.get<Model<PostDocument>>(getModelToken(Post.name));
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    await postModel.ensureIndexes();
    await userModel.ensureIndexes();

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('posts').deleteMany({});
    await mongoc.db('test').collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('should give all posts', async () => {
    const testPosts = [
      {
        postedBy: 'Ayrianna',
        title: 'BEWARE THE JESTER',
        content:
          "The Jester. We've all heard of his existence, but we've never once considered that he might be real. He might be one of us. He might be me! He might be you! Oh god, what if my parents are envoys of the Jester?!? What will become of me then?? May god have mercy on us all when we arrive at the pearly white gates in accordance to Jester's plan...",
        likes: 0,
        dislikes: 0,
        publicationdate: new Date('2023-04-08T18:16:01.891Z'),
        comments: [],
        associatedgame: [],
        likedBy: [],
        dislikedBy: [],
        __v: 0,
      },
      {
        postedBy: 'Lucas',
        title: 'I LOVE TESTING',
        content: 'This stuff never works I love it so much',
        likes: 0,
        dislikes: 0,
        publicationdate: new Date('2023-04-08T18:16:01.891Z'),
        comments: [],
        associatedgame: [],
        likedBy: [],
        dislikedBy: [],
        __v: 0,
      },
    ];

    await mongoc.db('test').collection('posts').insertMany(testPosts);

    const results = await service.findAll('', '');

    expect(results).toHaveLength(2);
    expect(results[0]).toHaveProperty('_id');
    expect(results[1]).toHaveProperty('_id');
    expect(results[0]).toHaveProperty('title', 'BEWARE THE JESTER');
    expect(results[1]).toHaveProperty('title', 'I LOVE TESTING');
  });

  describe('finding a post by id', () => {
    var _id;
    it('should return a post if it exists', async () => {
      const post = {
        postedBy: 'Ayrianna',
        title: 'BEWARE THE JESTER',
        content:
          "The Jester. We've all heard of his existence, but we've never once considered that he might be real. He might be one of us. He might be me! He might be you! Oh god, what if my parents are envoys of the Jester?!? What will become of me then?? May god have mercy on us all when we arrive at the pearly white gates in accordance to Jester's plan...",
        likes: 0,
        dislikes: 0,
        publicationdate: new Date('2023-04-08T18:16:01.891Z'),
        comments: [],
        associatedgame: [],
        likedBy: [],
        dislikedBy: [],
        __v: 0,
      };

      await mongoc.db('test').collection('posts').insertOne(post);

      const results = await mongoc
        .db('test')
        .collection('posts')
        .find({})
        .toArray();

      _id = results[0]._id;

      const foundPost = await service.findOne(_id);

      expect(foundPost).toHaveProperty('_id', _id);
      expect(foundPost).toHaveProperty('title', 'BEWARE THE JESTER');
      expect(foundPost).toHaveProperty('content', post.content);
      expect(foundPost).toHaveProperty('likes', 0);
      expect(foundPost).toHaveProperty('dislikes', 0);
      expect(foundPost).toHaveProperty('publicationdate', post.publicationdate);
      expect(foundPost).toHaveProperty('comments', []);
      expect(foundPost).toHaveProperty('associatedgame', []);
      expect(foundPost).toHaveProperty('likedBy', []);
      expect(foundPost).toHaveProperty('dislikedBy', []);
      expect(foundPost).toHaveProperty('__v', 0);
    });

    it('should return null if it does not exist', async () => {
      const foundPost = await service.findOne(_id);

      expect(foundPost).toBeNull();
    });
  });
});
