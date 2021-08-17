import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookCreateDTO, BookDto } from './dto/book.dto';
import { AuthorsService } from '../authors/authors.service';
import { AuthorEntity } from '../authors/entities/author.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        AuthorsService,
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create book', () => {
    it('should create and return book', async () => {
      const book = { id: '0', name: 'Book1' } as BookDto;

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(book));

      expect(await controller.create({ name: 'Book1' } as BookCreateDTO)).toBe(
        book,
      );
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const result = [{ id: '0', name: 'Book1' } as BookDto];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a book', async () => {
      const result = { id: '0', name: 'Book1' } as BookDto;

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne('0')).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest
        .spyOn(service, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.remove('0')).toBe(result);
    });
  });

  describe('update', () => {
    it('should return updated book', async () => {
      const result = {} as UpdateResult;

      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await controller.update('0', {
          name: 'new name',
        } as BookCreateDTO),
      ).toBe(result);
    });
  });
});
