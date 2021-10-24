import { IsNotEmpty } from 'class-validator';
import { BookDto } from 'src/books/dto/book.dto';

export class BookCycleDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  books?: BookDto[];
}

export class BookCycleCreateDTO {
  @IsNotEmpty()
  name: string;
}
