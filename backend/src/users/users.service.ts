import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { toUserDto } from './mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
    }

    return toUserDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map(toUserDto);
  }

  async create(createUserDto: UserCreateDTO): Promise<UserDto> {
    const user = await this.usersRepository.save(createUserDto);
    return toUserDto(user);
  }

  async update(id: string, updateUserDto: UserCreateDTO) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
