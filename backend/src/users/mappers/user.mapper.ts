import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email, dateOfBirth } = data;

  return { id, username, email, dateOfBirth };
};
