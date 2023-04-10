import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let app: TestingModule;
  let gamesController: GamesController;
  let gamesService: GamesService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          // mock the service, to avoid providing its dependencies
          provide: GamesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    gamesController = app.get<GamesController>(GamesController);
    gamesService = app.get<GamesService>(GamesService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('findAll', () => {
    it('should get all games from service and return them', async () => {
      const findAll = jest
        .spyOn(gamesService, 'findAll')
        .mockImplementation(async () => {
          return [
            {
              _id: '63921105733608daad199357',
              name: 'Among Us',
              description:
                'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
              releasedate: '2018-11-16T00:00:00.000Z',
              logo: 'examplelogo',
              __v: 0,
            },
          ];
        });

      const games = await gamesController.findAll();

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(games).toHaveLength(1);
      expect(games[0]).toHaveProperty('_id', '63921105733608daad199357');
      expect(games[0]).toHaveProperty('name', 'Among Us');
      expect(games[0]).toHaveProperty(
        'description',
        'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!'
      );
      expect(games[0]).toHaveProperty(
        'releasedate',
        '2018-11-16T00:00:00.000Z'
      );
      expect(games[0]).toHaveProperty('logo', 'examplelogo');
      expect(games[0]).toHaveProperty('__v', 0);
    });
  });

  describe('getOne', () => {
    it('calls getOne on the service', async () => {
      const game = {
        _id: '63921105733608daad199357',
        name: 'Among Us',
        description:
          'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
        releasedate: '2018-11-16T00:00:00.000Z',
        logo: 'examplelogo',
        __v: 0,
      };

      const getOne = jest.spyOn(gamesService, 'findOne')
        .mockImplementation(async () => game);

      const result = await gamesController.findOne(game._id);

      expect(getOne).toBeCalledTimes(1);
      expect(getOne).toBeCalledWith(game._id);
      expect(result).toStrictEqual(game);
    });
  });

  describe('create', () => {
    it('should call create on the service successfully', async () => {
      const create = jest
        .spyOn(gamesService, 'create')
        .mockImplementation(async () => {
          return { statuscode: 200, message: 'Game created successfully' };
        });

      const name = 'Among Us';
      const description =
        'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!';
      const releasedate = new Date('2018-11-16T00:00:00.000Z');
      const logo = 'examplelogo';

      const result = await gamesController.create({
        name,
        description,
        releasedate,
        logo,
      });

      expect(create).toBeCalledTimes(1);
      expect(result).toHaveProperty('statuscode', 200);
      expect(result).toHaveProperty('message', 'Game created successfully');
    });

    it('returns an error if the game is missing a name', async () => {
      const create = jest
        .spyOn(gamesService, 'create')
        .mockImplementation(async (game) => {
          return { statuscode: 400, message: 'Game validation failed: name: Path `name` is required.' };
        });

      const name = '';
      const description =
        'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!';
      const releasedate = new Date('2018-11-16T00:00:00.000Z');
      const logo = 'examplelogo';

      const result = await gamesController.create({
        name,
        description,
        releasedate,
        logo,
      });

      expect(create).toBeCalledTimes(1);
      expect(result).toHaveProperty('statuscode', 400);
      expect(result).toHaveProperty('message', 'Game validation failed: name: Path `name` is required.');
    });

    it('returns an error if the game is missing a name and a description', async () => {
      const create = jest
        .spyOn(gamesService, 'create')
        .mockImplementation(async (game) => {
          return { statuscode: 400, message: 'Game validation failed: description: Path `description` is required, name: Path `name` is required.' };
        });

      const name = '';
      const description = '';
      const releasedate = new Date('2018-11-16T00:00:00.000Z');
      const logo = 'examplelogo';

      const result = await gamesController.create({
        name,
        description,
        releasedate,
        logo,
      });

      expect(create).toBeCalledTimes(1);
      expect(result).toHaveProperty('statuscode', 400);
      expect(result).toHaveProperty('message', 'Game validation failed: description: Path `description` is required, name: Path `name` is required.');
    });
  });

  describe('delete', () => {
    it('should call delete on the service', async () => {
      const deleteExample = jest.spyOn(gamesService, 'delete')
        .mockImplementation(async () => {});

      const _id = "63921105733608daad199357";
      
      await gamesController.delete(_id);

      expect(deleteExample).toHaveBeenCalledWith(_id);
    });
  });

  describe('update', () => {
    const game = {
      name: 'Among Us',
      description:
        'Play with 4-15 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!',
      releasedate: new Date('2018-11-16T00:00:00.000Z'),
      logo: 'examplelogo',
    };

    it('should call update on the service', async () => {
      const update = jest.spyOn(gamesService, 'update')
      .mockImplementation(async () => {
        return { statuscode: 200, message: 'Game updated successfully', body: game };
      });

      const _id = "63921105733608daad199357";
      
      await gamesController.update(_id, game);

      expect(update).toHaveBeenCalledWith(_id, game);
    });
  });
});