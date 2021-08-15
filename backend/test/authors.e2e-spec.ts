import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthorsModule } from '../src/authors/authors.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorEntity } from '../src/authors/entities/author.entity';

describe('Authors', () => {
  let app: INestApplication;

  const dbMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const author = { id: '0', name: 'name', dateOfBirth: null };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthorsModule],
    })
      .overrideProvider(getRepositoryToken(AuthorEntity))
      .useValue(dbMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET authors`, () => {
    const authors = [author];

    jest
      .spyOn(dbMock, 'find')
      .mockImplementation(() => Promise.resolve(authors));
    return request(app.getHttpServer()).get('/authors').expect(200);
  });

  it(`/GET author`, () => {
    jest
      .spyOn(dbMock, 'findOne')
      .mockImplementation(() => Promise.resolve(author));
    return request(app.getHttpServer())
      .get('/authors/1')
      .expect(200)
      .expect(author);
  });

  it(`/DELETE author`, () => {
    return request(app.getHttpServer()).delete('/authors/1').expect(200);
  });

  it(`/POST author`, () => {
    jest
      .spyOn(dbMock, 'save')
      .mockImplementation(() => Promise.resolve(author));
    return request(app.getHttpServer()).post('/authors').expect(201);
  });

  it(`/PUT author`, () => {
    jest
      .spyOn(dbMock, 'update')
      .mockImplementation(() => Promise.resolve(author));
    return request(app.getHttpServer()).put('/authors/0').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
