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
import { UsersService } from './users.service';
import { UserCreateDTO, UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: UserCreateDTO): Promise<UserDto> {
    return this.usersService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: UserCreateDTO,
  ): Promise<any> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(id);
  }
}
