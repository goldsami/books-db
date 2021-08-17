import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/entities/author.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BooksService } from './books.service';
import { BookCreateDTO, BookDto } from './dto/book.dto';
import { BookEntity } from './entities/book.entity';
import { AuthorsService } from '../authors/authors.service';
import { AuthorDto } from 'src/authors/dto/author.dto';

describe('BooksService', () => {
  let service: BooksService;

  const booksRepoMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const authorsRepoMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        AuthorsService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: booksRepoMock,
        },
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: authorsRepoMock,
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
      const book = { name: 'Book1', authorId: '0' } as BookCreateDTO;
      const result = {
        name: 'Book1',
        id: '0',
      } as BookDto;
      const author = {
        id: '0',
      } as AuthorDto;

      jest.spyOn(authorsRepoMock, 'findOne').mockImplementation(() => author);
      jest.spyOn(booksRepoMock, 'save').mockImplementation(() => result);

      expect(await service.create(book)).toEqual(result);
    });

    it("should throw if there is book's author doesn't exist", async () => {
      const book = { name: 'Book1', authorId: '0' } as BookCreateDTO;

      jest.spyOn(authorsRepoMock, 'findOne').mockImplementation(() => null);
      // await service.create(book);
      await expect(service.create(book)).rejects.toEqual(
        new HttpException("Author doesn't exist", HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const result = [{ id: '0', name: 'Book1' } as BookDto];

      jest.spyOn(booksRepoMock, 'find').mockImplementation(() => result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const result = { id: '0', name: 'Book1' } as BookDto;

      jest
        .spyOn(booksRepoMock, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findOne('0')).toEqual(result);
    });

    it('should should throw if book not found', async () => {
      jest.spyOn(booksRepoMock, 'findOne').mockImplementation(() => null);

      expect(() => service.findOne('0')).rejects.toEqual(
        new HttpException("Book doesn't exist", HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest.spyOn(booksRepoMock, 'delete').mockImplementation(() => result);

      expect(await service.remove(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const book = { name: 'new name' } as BookCreateDTO;
      const result = {} as UpdateResult;

      jest.spyOn(booksRepoMock, 'update').mockImplementation(() => result);

      expect(await service.update('0', book)).toEqual(result);
    });
  });
});
