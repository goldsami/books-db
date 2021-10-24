import { toBookDto } from 'src/books/mappers/book.mapper';
import { toUserDto } from 'src/users/mappers/user.mapper';
import { ListDto } from '../dto/list.dto';
import { ListEntity } from '../entities/list.entity';

export const toListDto = (data: ListEntity): ListDto => {
  const { id, name, books, owner } = data;

  let result: Partial<ListDto> = { id, name };

  if (owner) {
    result = {
      ...result,
      owner: toUserDto(owner),
    };
  }

  if (books && books.length) {
    result = {
      ...result,
      books: books.map(toBookDto),
    };
  }

  return result as ListDto;
};
