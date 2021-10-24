import { IsNotEmpty } from 'class-validator';
import { AuthorDto } from 'src/authors/dto/author.dto';
import { BookCycleDto } from 'src/book-cycles/dto/book-cycle.dto';

export class BookDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  author?: AuthorDto;

  cycle?: BookCycleDto;
}

export class BookCreateDTO {
  @IsNotEmpty()
  name: string;

  authorId: string;

  cycleId: string;
}
