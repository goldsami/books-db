import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from '../authors/authors.service';
import { Repository } from 'typeorm';
import { BookCreateDTO, BookDto } from './dto/book.dto';
import { BookEntity } from './entities/book.entity';
import { toBookDto } from './mappers/book.mapper';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
    private authorsService: AuthorsService,
  ) {}

  async findOne(id: string): Promise<BookDto> {
    const book = await this.booksRepository.findOne(id);
    if (!book) {
      throw new HttpException("Book doesn't exist", HttpStatus.BAD_REQUEST);
    }

    return toBookDto(book);
  }

  async findAll(): Promise<BookDto[]> {
    const books = await this.booksRepository.find({ relations: ['author'] });
    return books.map(toBookDto);
  }

  async create(createBookDto: BookCreateDTO): Promise<BookDto> {
    const author = await this.authorsService.findOne(createBookDto.authorId);
    const book = await this.booksRepository.save({
      ...createBookDto,
      author,
    });

    return toBookDto(book);
  }

  async update(id: string, updateBookDto: BookCreateDTO) {
    return this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    return this.booksRepository.delete(id);
  }
}
