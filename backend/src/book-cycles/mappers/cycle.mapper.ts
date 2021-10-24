import { toBookDto } from 'src/books/mappers/book.mapper';
import { toAuthorDto } from '../../authors/mappers/author.mapper';
import { BookCycleDto } from '../dto/book-cycle.dto';
import { BookCycleEntity } from '../entities/book-cycle.entity';

export const toBookCycleDto = (data: BookCycleEntity): BookCycleDto => {
  const { id, name, books } = data;

  let result: BookCycleDto = { id, name, books: [] };

  if (books && books.length) {
    result = {
      ...result,
      books: books.map(toBookDto),
    };
  }

  return result;
};
