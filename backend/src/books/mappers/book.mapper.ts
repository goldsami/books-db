import { toBookCycleDto } from 'src/book-cycles/mappers/cycle.mapper';
import { toMarkDto } from 'src/marks/mappers/mark.mapper';
import { toAuthorDto } from '../../authors/mappers/author.mapper';
import { BookDto } from '../dto/book.dto';
import { BookEntity } from '../entities/book.entity';

export const toBookDto = (data: BookEntity): BookDto => {
  const { id, name, author, cycle, marks } = data;

  let result: BookDto = { id, name };

  if (author) {
    result = {
      ...result,
      author: toAuthorDto(author),
    };
  }

  if (cycle) {
    result = {
      ...result,
      cycle: toBookCycleDto(cycle),
    };
  }

  if (marks) {
    result = {
      ...result,
      marks: marks.map(toMarkDto),
    };
  }

  return result;
};
