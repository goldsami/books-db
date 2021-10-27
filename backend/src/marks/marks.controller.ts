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
import { MarksService } from './marks.service';
import { MarkCreateDTO, MarkDto } from './dto/mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private marksService: MarksService) {}

  @Get()
  async findAll(): Promise<MarkDto[]> {
    return this.marksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MarkDto> {
    return this.marksService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: MarkCreateDTO): Promise<MarkDto> {
    return this.marksService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: MarkCreateDTO,
  ): Promise<any> {
    return this.marksService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.marksService.remove(id);
  }
}
