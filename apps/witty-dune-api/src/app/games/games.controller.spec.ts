import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';

const date = new Date();

const model: Game = {
  "id": "0",
  "name": "Escape from Tarkov",
  "description": "Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security \"USEC\" and the Battle Encounter Assault Regiment \"BEAR\"). Players join matches called \"raids\" in which they fight other players and bots for loot and aim to survive and escape.",
  "releasedate": date,
  "logo": "https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg",
};

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((game: Game) =>
                Promise.resolve({ id: '1', ...game }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: "0",
                name: "Escape from Tarkov",
                description: "Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security \"USEC\" and the Battle Encounter Assault Regiment \"BEAR\"). Players join matches called \"raids\" in which they fight other players and bots for loot and aim to survive and escape.",
                releasedate: date,
                logo: "https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg",
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id: "0",
                name: "Escape from Tarkov",
                description: "Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security \"USEC\" and the Battle Encounter Assault Regiment \"BEAR\"). Players join matches called \"raids\" in which they fight other players and bots for loot and aim to survive and escape.",
                releasedate: date,
                logo: "https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg",
              }),
            ),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    controller = module.get<GamesController>(GamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      controller.findAll();
      expect(controller.findAll()).resolves.toEqual([{
        id: "0",
        name: "Escape from Tarkov",
        description: "Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security \"USEC\" and the Battle Encounter Assault Regiment \"BEAR\"). Players join matches called \"raids\" in which they fight other players and bots for loot and aim to survive and escape.",
        releasedate: date,
        logo: "https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg",
      }]);
    });
  });

  describe('findOne', () => {
    it('should return a game', async () => {
      controller.findOne('mdw89aihfoiawekl');
      expect(controller.findOne('mdw89aihfoiawekl')).resolves.toEqual({
        id: "0",
        name: "Escape from Tarkov",
        description: "Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security \"USEC\" and the Battle Encounter Assault Regiment \"BEAR\"). Players join matches called \"raids\" in which they fight other players and bots for loot and aim to survive and escape.",
        releasedate: date,
        logo: "https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg",
      });
    });
  });

  it('should remove the user', () => {
    controller.delete('mdw89aihfoiawekl');
    expect(service.delete).toHaveBeenCalled();
  });

  describe('update', () => {
    it('should update a game', async () => {
      controller.update('mdw89aihfoiawekl', model);
      expect(controller.findOne('mdw89aihfoiawekl')).resolves.toEqual({
        id: "0",
        name: "Escape from Tarkov",
        description: "Escape from Tarkov is a multiplayer tactical first-person shooter video game in development by Battlestate Games for Windows. The game is set in the fictional Norvinsk region, where a war is taking place between two private military companies (United Security \"USEC\" and the Battle Encounter Assault Regiment \"BEAR\"). Players join matches called \"raids\" in which they fight other players and bots for loot and aim to survive and escape.",
        releasedate: date,
        logo: "https://i.pinimg.com/originals/d7/6b/85/d76b85fdceaf0c0e4d32df008616dfb4.jpg",
      });
    });
  });
});
