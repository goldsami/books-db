import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCycleCreateDTO, BookCycleDto } from './dto/book-cycle.dto';
import { BookCycleEntity } from './entities/book-cycle.entity';
import { toBookCycleDto } from './mappers/cycle.mapper';

@Injectable()
export class BookCyclesService {
  constructor(
    @InjectRepository(BookCycleEntity)
    private bookCyclesRepository: Repository<BookCycleEntity>,
  ) {}

  async findOne(id: string): Promise<BookCycleDto> {
    const bookCycle = await this.bookCyclesRepository.findOne(id);
    if (!bookCycle) {
      throw new HttpException(
        "Book Cycle doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    }

    return toBookCycleDto(bookCycle);
  }

  async findAll(): Promise<BookCycleDto[]> {
    const bookCycles = await this.bookCyclesRepository.find({
      relations: ['books'],
    });
    return bookCycles.map(toBookCycleDto);
  }

  async create(createBookCycleDto: BookCycleCreateDTO): Promise<BookCycleDto> {
    const bookCycle = await this.bookCyclesRepository.save({
      ...createBookCycleDto,
    });

    return toBookCycleDto(bookCycle);
  }

  async update(id: string, updateBookCycleDto: BookCycleCreateDTO) {
    return this.bookCyclesRepository.update(id, updateBookCycleDto);
  }

  async remove(id: string) {
    return this.bookCyclesRepository.delete(id);
  }
}
