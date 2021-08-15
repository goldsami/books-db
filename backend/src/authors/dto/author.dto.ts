import { IsNotEmpty } from 'class-validator';
import { BookDto } from 'src/books/dto/book.dto';

export class AuthorDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  dateOfBirth?: Date;
  books: BookDto[];
}

export class AuthorCreateDTO {
  name: string;
  dateOfBirth?: Date;
}
