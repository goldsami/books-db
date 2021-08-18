import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  dateOfBirth?: Date;
}

export class UserCreateDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty() password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  dateOfBirth?: Date;
}

export class LoginUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
