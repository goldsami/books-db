import { BookDto } from '../dto/book.dto';
import { BookEntity } from '../entities/book.entity';

export const toBookDto = (data: BookEntity): BookDto => {
  const { id, name } = data;

  return { id, name };
};
