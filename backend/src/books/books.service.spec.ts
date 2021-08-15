import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BooksService } from './books.service';
import { BookCreateDTO, BookDto } from './dto/book.dto';
import { BookEntity } from './entities/book.entity';

describe('BooksService', () => {
  let service: BooksService;

  const dbMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create book', () => {
    it('should create and return book', async () => {
      const book = { name: 'Book1' } as BookCreateDTO;
      const result = {
        name: 'Book1',
        id: '0',
      } as BookDto;

      jest.spyOn(dbMock, 'save').mockImplementation(() => result);

      expect(await service.create(book)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const result = [{ id: '0', name: 'Book1' } as BookDto];

      jest.spyOn(dbMock, 'find').mockImplementation(() => result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const result = { id: '0', name: 'Book1' } as BookDto;

      jest
        .spyOn(dbMock, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findOne('0')).toEqual(result);
    });

    it('should should throw if book not found', async () => {
      jest.spyOn(dbMock, 'findOne').mockImplementation(() => null);
      expect(() => service.findOne('0')).rejects.toThrowError(
        new HttpException("Book doesn't exist", HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest.spyOn(dbMock, 'delete').mockImplementation(() => result);

      expect(await service.remove(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const book = { name: 'new name' } as BookCreateDTO;
      const result = {} as UpdateResult;

      jest.spyOn(dbMock, 'update').mockImplementation(() => result);

      expect(await service.update('0', book)).toEqual(result);
    });
  });
});
