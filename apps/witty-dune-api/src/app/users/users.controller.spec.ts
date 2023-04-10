import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Neo4jService } from '../neo/neo4j.service';
import { User } from './schemas/user.schema';

describe('UsersController', () => {
  let app: TestingModule;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          // mock the service, to avoid providing its dependencies
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            profile: jest.fn(),
            follow: jest.fn(),
            unfollow: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
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

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('profile', () => {
    it('calls profile on the service', async () => {
      const user = {
        _id: '64319dee47c3413030e067cd',
        username: 'Redralis',
        password: 'test',
        firstname: 'Lucas',
        lastname: 'de Kleijn',
        email: 'l.dekleijn2@student.avans.nl',
        dateofbirth: new Date('2003-01-27T00:00:00.000Z'),
        country: 'Netherlands',
        following: [],
        profilepic:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        __v: 0,
      };

      const profile = jest.spyOn(usersService, 'profile')
        .mockImplementation(async () => user);

      const result = await usersController.getProfile(user.username);

      expect(profile).toBeCalledTimes(1);
      expect(profile).toBeCalledWith(user.username);
      expect(result).toStrictEqual(user);
    });

    it('returns null when the user is not found', async () => {
      const profile = jest.spyOn(usersService, 'profile')
        .mockImplementation(async () => null);

      const result = await usersController.getProfile('Redralis');

      expect(profile).toBeCalledTimes(1);
      expect(profile).toBeCalledWith('Redralis');
      expect(result).toBeNull();
    });
  });

  describe('follow', () => {
    it('calls follow on the service', async () => {
      const follow = jest.spyOn(usersService, 'follow')
        .mockImplementation(async () => null);

      const result = await usersController.follow('123', '456');

      expect(follow).toBeCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  describe('unfollow', () => {
    it('calls unfollow on the service', async () => {
      const unfollow = jest.spyOn(usersService, 'unfollow')
        .mockImplementation(async () => null);

      const result = await usersController.unfollow('123', '456');

      expect(unfollow).toBeCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
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
      __v: 0,
    };

    it('calls update on the service', async () => {
      const update = jest.spyOn(usersService, 'update')
      .mockImplementation(async (id: string, user: User) => {
        return { statuscode: 200, message: 'User updated successfully', body: user };
      });

      const _id = "63921105733608daad199357";

      const result = await usersController.update(_id, user);

      expect(update).toBeCalledTimes(1);
      expect(result.body).toStrictEqual(user);
      expect(result.message).toBe('User updated successfully');
      expect(result.statuscode).toBe(200);
    });

    it('returns null when the user is not found', async () => {
      const update = jest.spyOn(usersService, 'update')
        .mockImplementation(async (id: string, user: User) => {
          return { statuscode: 404, message: 'User not found', body: null };
        });

      const _id = "123";

      const result = await usersController.update(_id, user);

      expect(update).toBeCalledTimes(1);
      expect(result.body).toBeNull();
      expect(result.message).toBe('User not found');
      expect(result.statuscode).toBe(404);
    });
  });
});