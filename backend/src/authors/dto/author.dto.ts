import { IsNotEmpty } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  dateOfBirth?: Date;
}

export class AuthorCreateDTO {
  name: string;
  dateOfBirth?: Date;
}
