import { MarkDto } from '../dto/mark.dto';
import { MarkEntity } from '../entities/mark.entity';

export const toMarkDto = (data: MarkEntity): MarkDto => {
  const { id, value } = data;

  return {
    id,
    value,
  };
};
