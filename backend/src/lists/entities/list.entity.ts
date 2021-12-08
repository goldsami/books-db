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

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @ManyToMany(() => BookEntity)
  @JoinTable()
  books: BookEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.lists)
  owner: UserEntity;
}
