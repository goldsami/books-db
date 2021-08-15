import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorCreateDTO, AuthorDto } from './dto/author.dto';
import { AuthorEntity } from './entities/author.entity';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create author', () => {
    it('should create and return author', async () => {
      const author = { name: 'Author1' } as AuthorCreateDTO;

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(author as AuthorDto));

      expect(await controller.create(author as AuthorCreateDTO)).toBe(author);
    });
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const result = [{ name: 'Author1' } as AuthorDto];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a author', async () => {
      const result = { name: 'Author1' } as AuthorDto;

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne('0')).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a author', async () => {
      const id = '0';
      const result = {} as DeleteResult;

      jest
        .spyOn(service, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.remove('0')).toBe(result);
    });
  });

  describe('update', () => {
    it('should return updated author', async () => {
      const result = {} as UpdateResult;

      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await controller.update('0', {
          name: 'new name',
        } as AuthorCreateDTO),
      ).toBe(result);
    });
  });
});
