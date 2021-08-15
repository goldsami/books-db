import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorCreateDTO, AuthorDto } from './dto/author.dto';
import { AuthorEntity } from './entities/author.entity';
import { toAuthorDto } from './mappers/author.mapper';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
  ) {}

  async findOne(id: string): Promise<AuthorDto> {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new HttpException("Author doesn't exist", HttpStatus.BAD_REQUEST);
    }

    return toAuthorDto(author);
  }

  async findAll(): Promise<AuthorDto[]> {
    const authors = await this.authorsRepository.find();
    return authors.map(toAuthorDto);
  }

  async create(createAuthorDto: AuthorCreateDTO): Promise<AuthorDto> {
    const author = await this.authorsRepository.save(createAuthorDto);
    return toAuthorDto(author);
  }

  async update(id: string, updateAuthorDto: AuthorCreateDTO) {
    return this.authorsRepository.update(id, updateAuthorDto);
  }

  async remove(id: string) {
    return this.authorsRepository.delete(id);
  }
}
