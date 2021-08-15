import { AuthorEntity } from '../../authors/entities/author.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @ManyToOne((type) => AuthorEntity, (author) => author.books)
  author?: AuthorEntity;
}
