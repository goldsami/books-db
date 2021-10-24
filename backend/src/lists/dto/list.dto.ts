import { IsNotEmpty } from 'class-validator';
import { BookDto } from 'src/books/dto/book.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class ListDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  owner: UserDto;

  books?: BookDto[];
}

export class ListCreateDTO {
  @IsNotEmpty()
  name: string;

  ownerId: string;

  bookIds: string[];
}
