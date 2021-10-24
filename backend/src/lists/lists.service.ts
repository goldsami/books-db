import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { DeepPartial, Repository } from 'typeorm';
import { ListCreateDTO, ListDto } from './dto/list.dto';
import { ListEntity } from './entities/list.entity';
import { toListDto } from './mappers/list.mapper';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListEntity)
    private listsRepository: Repository<ListEntity>,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async findOne(id: string): Promise<ListDto> {
    const list = await this.listsRepository.findOne(id, {
      relations: ['owner', 'books'],
    });
    if (!list) {
      throw new HttpException("List doesn't exist", HttpStatus.BAD_REQUEST);
    }

    return toListDto(list);
  }

  async findAll(): Promise<ListDto[]> {
    const lists = await this.listsRepository.find({
      relations: ['owner', 'books'],
    });
    return lists.map(toListDto);
  }

  async create(createListDto: ListCreateDTO): Promise<ListDto> {
    const saveData: DeepPartial<ListEntity> = {
      ...createListDto,
    };
    const owner = await this.usersService.findOne(createListDto.ownerId);
    saveData.owner = {
      id: owner.id,
    };

    if (createListDto.bookIds?.length) {
      const books = await Promise.all(
        createListDto.bookIds.map((bookId) =>
          this.booksService.findOne(bookId),
        ),
      );
      saveData.books = books;
    }

    const list = await this.listsRepository.save(saveData);

    return toListDto(list);
  }

  async update(id: string, updateListDto: ListCreateDTO) {
    return this.listsRepository.update(id, updateListDto);
  }

  async remove(id: string) {
    return this.listsRepository.delete(id);
  }
}
