import { IsIn, IsNotEmpty } from 'class-validator';

export class MarkDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsIn(Array.from(Array(10), (e, i) => i + 1))
  value: number;
}

export class MarkCreateDTO {
  @IsNotEmpty()
  @IsIn([...Array(10).keys()])
  value: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  bookId: string;
}
