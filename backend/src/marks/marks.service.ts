import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { DeepPartial, Repository } from 'typeorm';
import { MarkCreateDTO, MarkDto } from './dto/mark.dto';
import { MarkEntity } from './entities/mark.entity';
import { toMarkDto } from './mappers/mark.mapper';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(MarkEntity)
    private marksRepository: Repository<MarkEntity>,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async findOne(id: string): Promise<MarkDto> {
    const mark = await this.marksRepository.findOne(id, {
      relations: ['user', 'book'],
    });
    if (!mark) {
      throw new HttpException("Mark doesn't exist", HttpStatus.BAD_REQUEST);
    }

    return toMarkDto(mark);
  }

  async findAll(): Promise<MarkDto[]> {
    const marks = await this.marksRepository.find({
      relations: ['user', 'book'],
    });
    return marks.map(toMarkDto);
  }

  async create(createMarkDto: MarkCreateDTO): Promise<MarkDto> {
    const saveData: DeepPartial<MarkEntity> = {
      ...createMarkDto,
    };
    const user = await this.usersService.findOne(createMarkDto.userId);
    saveData.user = {
      id: user.id,
    };

    const book = await this.booksService.findOne(createMarkDto.bookId);
    saveData.book = {
      id: book.id,
    };

    const mark = await this.marksRepository.save(saveData);

    return toMarkDto(mark);
  }

  async update(id: string, updateMarkDto: DeepPartial<MarkCreateDTO>) {
    let updateData: DeepPartial<MarkEntity>;
    if ('userId' in updateMarkDto) {
      updateData = {
        user: {
          id: updateMarkDto.userId,
        },
      };
    }
    if ('bookId' in updateMarkDto) {
      updateData = {
        book: {
          id: updateMarkDto.bookId,
        },
      };
    }
    return this.marksRepository.update(id, updateData);
  }

  async remove(id: string) {
    return this.marksRepository.delete(id);
  }
}
