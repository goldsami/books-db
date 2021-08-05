import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const dbMock = {
    insert: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    it('should create and return user', async () => {
      const user = { firstName: 'User1' } as CreateUserDto;

      jest
        .spyOn(dbMock, 'insert')
        .mockImplementation(() => Promise.resolve(user));

      expect(await service.create(user)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = [{ firstName: 'User1' } as User];

      jest.spyOn(dbMock, 'find').mockImplementation(() => result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = { firstName: 'User1' } as User;

      jest
        .spyOn(dbMock, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findOne('0')).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest
        .spyOn(dbMock, 'delete')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.remove(id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const user = { firstName: 'new firstName' } as UpdateUserDto;
      const result = {} as UpdateResult;

      jest
        .spyOn(dbMock, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.update('0', user)).toBe(result);
    });
  });
});
