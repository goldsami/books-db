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
import { BookCyclesService } from './book-cycles.service';
import { BookCycleCreateDTO, BookCycleDto } from './dto/book-cycle.dto';

@Controller('cycles')
export class BookCyclesController {
  constructor(private bookCyclesService: BookCyclesService) {}

  @Get()
  async findAll(): Promise<BookCycleDto[]> {
    return this.bookCyclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookCycleDto> {
    return this.bookCyclesService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: BookCycleCreateDTO): Promise<BookCycleDto> {
    return this.bookCyclesService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: BookCycleCreateDTO,
  ): Promise<any> {
    return this.bookCyclesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.bookCyclesService.remove(id);
  }
}
