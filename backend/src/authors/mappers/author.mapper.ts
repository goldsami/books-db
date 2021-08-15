import { AuthorDto } from '../dto/author.dto';
import { AuthorEntity } from '../entities/author.entity';

export const toAuthorDto = (data: AuthorEntity): AuthorDto => {
  const { id, name, dateOfBirth } = data;

  return { id, name, dateOfBirth };
};
