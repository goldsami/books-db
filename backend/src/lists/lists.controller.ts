import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  Query,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ListCreateDTO, ListDto } from './dto/list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async findAll(@Query('userId') userId: number): Promise<ListDto[]> {
    console.log('userid', userId);
    return this.listsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ListDto> {
    return this.listsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: ListCreateDTO): Promise<ListDto> {
    return this.listsService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: DeepPartial<ListCreateDTO>,
  ): Promise<any> {
    return this.listsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.listsService.remove(id);
  }
}
