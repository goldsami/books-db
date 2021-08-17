import { IsNotEmpty } from 'class-validator';
import { AuthorDto } from 'src/authors/dto/author.dto';

export class BookDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  author?: AuthorDto;
}

export class BookCreateDTO {
  @IsNotEmpty()
  name: string;

  authorId: string;
}
