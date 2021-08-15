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
import { AuthorsService } from './authors.service';
import { AuthorCreateDTO, AuthorDto } from './dto/author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  async findAll(): Promise<AuthorDto[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuthorDto> {
    return this.authorsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: AuthorCreateDTO): Promise<AuthorDto> {
    return this.authorsService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: AuthorCreateDTO,
  ): Promise<any> {
    return this.authorsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.authorsService.remove(id);
  }
}
