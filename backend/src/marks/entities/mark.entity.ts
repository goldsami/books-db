import { BookEntity } from '../../books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('mark')
export class MarkEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  value: number;

  @ManyToOne((type) => UserEntity, (user) => user.marks)
  user: UserEntity;

  @ManyToOne((type) => BookEntity, (book) => book.marks)
  book: BookEntity;
}
