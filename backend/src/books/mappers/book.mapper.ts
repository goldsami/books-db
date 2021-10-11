import { toAuthorDto } from '../../authors/mappers/author.mapper';
import { BookDto } from '../dto/book.dto';
import { BookEntity } from '../entities/book.entity';

export const toBookDto = (data: BookEntity): BookDto => {
  const { id, name, author } = data;

  let result: BookDto = { id, name };

  if (author) {
    result = {
      ...result,
      author: toAuthorDto(author),
    };
  }

  return result;
};
