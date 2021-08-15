import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, name, dateOfBirth } = data;

  return { id, name, dateOfBirth };
};
