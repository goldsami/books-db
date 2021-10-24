import { AuthorEntity } from '../../authors/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookCycleEntity } from 'src/book-cycles/entities/book-cycle.entity';
import { BookCycleDto } from 'src/book-cycles/dto/book-cycle.dto';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @ManyToOne((type) => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @ManyToOne((type) => BookCycleEntity, (cycle) => cycle.books)
  cycle: BookCycleEntity;
}
