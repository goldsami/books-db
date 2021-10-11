import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto, UserCreateDTO, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { toUserDto } from './mappers/user.mapper';
import * as bcrypt from 'bcrypt';

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

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map(toUserDto);
  }

  async create(createUserDto: UserCreateDTO): Promise<UserDto> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
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
