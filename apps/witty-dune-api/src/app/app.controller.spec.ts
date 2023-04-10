import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { Neo4jService } from './neo/neo4j.service';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let authService: AuthService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          // mock the service, to avoid providing its dependencies
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
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

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a user', async () => {
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

      const register = jest
        .spyOn(authService, 'register')
        .mockImplementation(async () => {
          return {
            statuscode: 201,
            message: 'User registered successfully',
            body: user,
          };
        });

      const result = await appController.register(user);

      expect(register).toBeCalledTimes(1);
      expect(result).toHaveProperty('statuscode', 201);
      expect(result).toHaveProperty('message', 'User registered successfully');
      expect(result).toHaveProperty('body', user);
    });

    it('should not register a user if password is nog given', async () => {
      const user = {
        username: 'Redralis',
        password: '',
        firstname: 'Lucas',
        lastname: 'de Kleijn',
        email: 'l.dekleijn2@student.avans.nl',
        dateofbirth: new Date('2003-01-27T00:00:00.000Z'),
        country: 'Netherlands',
        following: null,
        profilepic:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      };
      
      const register = jest
        .spyOn(authService, 'register')
        .mockImplementation(async () => {
          return {
            statuscode: 400,
            message: `Path: 'password' is required.`,
          };
        });

      const result = await appController.register(user);

      expect(register).toBeCalledTimes(1);
      expect(result).toHaveProperty('statuscode', 400);
      expect(result).toHaveProperty('message', `Path: 'password' is required.`);
    });
  });

  describe('login', () => {
    it('should be able to log in', async () => {
      const user = {
        username: 'Redralis',
        password: 'test',
      };

      const login = jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => {
          return {
            access_token: 'test',
            username: 'Redralis'
          };
        });

      const result = await appController.login(user);

      expect(login).toBeCalledTimes(1);
      expect(result).toHaveProperty('username', 'Redralis');
      expect(result).toHaveProperty('access_token', 'test');
    });

    it('should not be able to log in if password is wrong', async () => {
      const user = {
        username: 'Redralis',
        password: 'test',
      };

      const login = jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => {
          return {
            access_token: undefined,
            username: undefined,
            statusCode: 401,
            message: 'Unauthorized',
          };
        });

      const result = await appController.login(user);

      expect(login).toBeCalledTimes(1);
      expect(result).toHaveProperty('statusCode', 401);
      expect(result).toHaveProperty('message', 'Unauthorized');
    });
  });
});
