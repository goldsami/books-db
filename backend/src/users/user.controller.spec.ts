import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create user', () => {
    it('should create and return user', async () => {
      const user = { name: 'User1' } as UserEntity;

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(user));

      expect(await controller.create(user as UserCreateDTO)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = [{ name: 'User1' } as UserEntity];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = { name: 'User1' } as UserEntity;

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne('0')).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest
        .spyOn(service, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.remove('0')).toBe(result);
    });
  });

  describe('update', () => {
    it('should return updated user', async () => {
      const result = {} as UpdateResult;

      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await controller.update('0', {
          name: 'new name',
        } as UserCreateDTO),
      ).toBe(result);
    });
  });
});
