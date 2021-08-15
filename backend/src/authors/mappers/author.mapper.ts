import { toBookDto } from '../../books/mappers/book.mapper';
import { AuthorDto } from '../dto/author.dto';
import { AuthorEntity } from '../entities/author.entity';

export const toAuthorDto = (data: AuthorEntity): AuthorDto => {
  const { id, name, dateOfBirth, books } = data;

  let result: AuthorDto = { id, name, dateOfBirth, books: [] };

  if (books && books.length) {
    result = {
      ...result,
      books: books.map(toBookDto),
    };
  }

  return result;
};
