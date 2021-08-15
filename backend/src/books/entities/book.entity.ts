import {
  Column,
  CreateDateColumn,
  Entity,
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
}
