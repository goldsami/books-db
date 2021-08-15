import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BooksModule } from '../src/books/books.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookEntity } from '../src/books/entities/book.entity';

describe('Books', () => {
  let app: INestApplication;

  const dbMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const book = { id: '0', name: 'name' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(getRepositoryToken(BookEntity))
      .useValue(dbMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, () => {
    const books = [book];

    jest.spyOn(dbMock, 'find').mockImplementation(() => Promise.resolve(books));
    return request(app.getHttpServer()).get('/books').expect(200);
  });

  it(`/GET book`, () => {
    jest
      .spyOn(dbMock, 'findOne')
      .mockImplementation(() => Promise.resolve(book));
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect(book);
  });

  it(`/DELETE book`, () => {
    return request(app.getHttpServer()).delete('/books/1').expect(200);
  });

  it(`/POST book`, () => {
    jest.spyOn(dbMock, 'save').mockImplementation(() => Promise.resolve(book));
    return request(app.getHttpServer()).post('/books').expect(201);
  });

  it(`/PUT book`, () => {
    jest
      .spyOn(dbMock, 'update')
      .mockImplementation(() => Promise.resolve(book));
    return request(app.getHttpServer()).put('/books/0').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
