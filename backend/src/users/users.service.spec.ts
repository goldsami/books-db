import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UsersService } from './users.service';
import { UserCreateDTO, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const dbMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const dateOfBirth = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
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
      const user = { name: 'User1' } as UserCreateDTO;
      const result = {
        name: 'User1',
        id: '0',
        dateOfBirth,
      } as UserDto;

      jest.spyOn(dbMock, 'save').mockImplementation(() => result);

      expect(await service.create(user)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = [{ id: '0', name: 'User1', dateOfBirth } as UserDto];

      jest.spyOn(dbMock, 'find').mockImplementation(() => result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = { id: '0', name: 'User1', dateOfBirth } as UserDto;

      jest
        .spyOn(dbMock, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findOne('0')).toEqual(result);
    });

    it('should should throw if user not found', async () => {
      jest.spyOn(dbMock, 'findOne').mockImplementation(() => null);
      expect(() => service.findOne('0')).rejects.toEqual(
        new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest.spyOn(dbMock, 'delete').mockImplementation(() => result);

      expect(await service.remove(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const user = { name: 'new name' } as UserCreateDTO;
      const result = {} as UpdateResult;

      jest.spyOn(dbMock, 'update').mockImplementation(() => result);

      expect(await service.update('0', user)).toEqual(result);
    });
  });
});
