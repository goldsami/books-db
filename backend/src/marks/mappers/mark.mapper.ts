import { toBookDto } from 'src/books/mappers/book.mapper';
import { toUserDto } from 'src/users/mappers/user.mapper';
import { MarkDto } from '../dto/mark.dto';
import { MarkEntity } from '../entities/mark.entity';

export const toMarkDto = (data: MarkEntity): MarkDto => {
  const { id, value } = data;

  let result: MarkDto = {
    id,
    value,
  };

  return result;
};
