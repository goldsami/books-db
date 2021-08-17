import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthorsService } from './authors.service';
import { AuthorCreateDTO, AuthorDto } from './dto/author.dto';
import { AuthorEntity } from './entities/author.entity';

describe('AuthorsService', () => {
  let service: AuthorsService;

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
        AuthorsService,
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create author', () => {
    it('should create and return author', async () => {
      const author = { name: 'Author1' } as AuthorCreateDTO;
      const result = {
        name: 'Author1',
        id: '0',
        dateOfBirth,
        books: [],
      } as AuthorDto;

      jest.spyOn(dbMock, 'save').mockImplementation(() => result);

      expect(await service.create(author)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const result = [
        { id: '0', name: 'Author1', dateOfBirth, books: [] } as AuthorDto,
      ];

      jest.spyOn(dbMock, 'find').mockImplementation(() => result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a author', async () => {
      const result = {
        id: '0',
        name: 'Author1',
        dateOfBirth,
        books: [],
      } as AuthorDto;

      jest
        .spyOn(dbMock, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findOne('0')).toEqual(result);
    });

    it('should should throw if author not found', async () => {
      jest.spyOn(dbMock, 'findOne').mockImplementation(() => null);
      expect(() => service.findOne('0')).rejects.toEqual(
        new HttpException("Author doesn't exist", HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('should delete a author', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest.spyOn(dbMock, 'delete').mockImplementation(() => result);

      expect(await service.remove(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update author', async () => {
      const author = { name: 'new name' } as AuthorCreateDTO;
      const result = {} as UpdateResult;

      jest.spyOn(dbMock, 'update').mockImplementation(() => result);

      expect(await service.update('0', author)).toEqual(result);
    });
  });
});
