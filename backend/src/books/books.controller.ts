import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookCreateDTO, BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async findAll(): Promise<BookDto[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookDto> {
    return this.booksService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: BookCreateDTO): Promise<BookDto> {
    return this.booksService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: BookCreateDTO,
  ): Promise<any> {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.booksService.remove(id);
  }
}
