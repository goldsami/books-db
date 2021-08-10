import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/schemas/user.schema';

describe('Users', () => {
  let app: INestApplication;

  const dbMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const user = { firstName: 'name' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(dbMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    const users = [user];

    jest
      .spyOn(dbMock, 'find')
      .mockImplementation(() => Promise.resolve({ users }));
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({ users });
  });

  it(`/GET user`, () => {
    jest
      .spyOn(dbMock, 'findOne')
      .mockImplementation(() => Promise.resolve({ user }));
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({ user });
  });

  it(`/DELETE user`, () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  it(`/POST user`, () => {
    jest.spyOn(dbMock, 'save').mockImplementation(() => Promise.resolve(user));
    return request(app.getHttpServer()).post('/users').expect(201);
  });

  it(`/PATCH user`, () => {
    jest
      .spyOn(dbMock, 'update')
      .mockImplementation(() => Promise.resolve(user));
    return request(app.getHttpServer()).patch('/users/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
