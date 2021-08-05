import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
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
      const user = { firstName: 'User1' } as User;

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(user));

      expect(await controller.create(user as CreateUserDto)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = [{ firstName: 'User1' } as User];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = { firstName: 'User1' } as User;

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
          firstName: 'new firstName',
        } as UpdateUserDto),
      ).toBe(result);
    });
  });
});
