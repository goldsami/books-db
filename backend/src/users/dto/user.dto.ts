import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  dateOfBirth?: Date;
}

export class UserCreateDTO {
  name: string;
  dateOfBirth?: Date;
}
