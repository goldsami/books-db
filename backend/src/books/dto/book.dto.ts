import { IsNotEmpty } from 'class-validator';
import { AuthorDto } from 'src/authors/dto/author.dto';
import { BookCycleDto } from 'src/book-cycles/dto/book-cycle.dto';
import { MarkDto } from 'src/marks/dto/mark.dto';

export class BookDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  author?: AuthorDto;

  cycle?: BookCycleDto;

  marks?: MarkDto[];
}

export class BookCreateDTO {
  @IsNotEmpty()
  name: string;

  authorId: string;

  cycleId: string;
}
