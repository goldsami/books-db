import { IsNotEmpty } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}

export class BookCreateDTO {
  name: string;
}
