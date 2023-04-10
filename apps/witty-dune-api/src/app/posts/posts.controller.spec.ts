import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';
import { Game } from '../games/schemas/game.schema';
import { Neo4jService } from '../neo/neo4j.service';

describe('PostsController', () => {
  let app: TestingModule;
  let postsController: PostsController;
  let postsService: PostsService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          // mock the service, to avoid providing its dependencies
          provide: PostsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: Neo4jService,
          useValue: {
            write: jest.fn(),
            read: jest.fn(),
          },
        },
      ],
    }).compile();

    postsController = app.get<PostsController>(PostsController);
    postsService = app.get<PostsService>(PostsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should get all posts from service and return them', async () => {
      const findAll = jest
        .spyOn(postsService, 'findAll')
        .mockImplementation(async () => {
          return [{
            _id: '6431af617ca0a95467c82d1f',
            postedBy: 'Ayrianna',
            title: 'BEWARE THE JESTER',
            content: "The Jester. We've all heard of his existence, but we've never once considered that he might be real. He might be one of us. He might be me! He might be you! Oh god, what if my parents are envoys of the Jester?!? What will become of me then?? May god have mercy on us all when we arrive at the pearly white gates in accordance to Jester's plan...",
            likes: 0,
            dislikes: 0,
            publicationdate: new Date('2023-04-08T18:16:01.891Z'),
            comments: [],
            associatedgame: [
              {
                name: 'The Sims 4',
                description: 'The Sims 4 is the ultimate life simulation game—create unique characters, build dream homes, and let chaos unfold. Oh, and did we mention it’s free?',
                releasedate: new Date('2014-09-02T00:00:00.000Z'),
                logo: 'https://sims-online.com/wp-content/uploads/2015/02/sims-4-base-game-official-icon.png',
              },
            ],
            likedBy: '',
            dislikedBy: '',
            __v: 0,
          }] as unknown as Post[];
        });

      const posts = await postsController.findAll({ filter: '', userId: '' });

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(posts).toHaveLength(1);
      expect(posts[0]).toHaveProperty('_id', '6431af617ca0a95467c82d1f');
      expect(posts[0]).toHaveProperty('title', 'BEWARE THE JESTER');
    });
  });

  describe('getOne', () => {
    it('calls getOne on the service', async () => {
      const post = {
        _id: '6431af617ca0a95467c82d1f',
        postedBy: 'Ayrianna',
        title: 'BEWARE THE JESTER',
        content:
          "The Jester. We've all heard of his existence, but we've never once considered that he might be real. He might be one of us. He might be me! He might be you! Oh god, what if my parents are envoys of the Jester?!? What will become of me then?? May god have mercy on us all when we arrive at the pearly white gates in accordance to Jester's plan...",
        likes: 0,
        dislikes: 0,
        publicationdate: new Date('2023-04-08T18:16:01.891Z'),
        comments: [],
        associatedgame: [
          {
            name: 'The Sims 4',
            description:
              'The Sims 4 is the ultimate life simulation game—create unique characters, build dream homes, and let chaos unfold. Oh, and did we mention it’s free?',
            releasedate: new Date('2014-09-02T00:00:00.000Z'),
            logo: 'https://sims-online.com/wp-content/uploads/2015/02/sims-4-base-game-official-icon.png',
          },
        ],
        likedBy: '',
        dislikedBy: '',
        __v: 0,
      };

      const getOne = jest
        .spyOn(postsService, 'findOne')
        .mockImplementation(async () => {
          return post as unknown as Post;
        });

      const result = await postsController.findOne(post._id);

      expect(getOne).toBeCalledTimes(1);
      expect(getOne).toBeCalledWith(post._id);
      expect(result).toStrictEqual(post);
    });

    it('returns null if the post does not exist', async () => {
      const getOne = jest
        .spyOn(postsService, 'findOne')
        .mockImplementation(async () => {
          return null;
        });

      const result = await postsController.findOne('123');

      expect(getOne).toBeCalledTimes(1);
      expect(getOne).toBeCalledWith('123');
      expect(result).toBeNull();
    });
  });
});
