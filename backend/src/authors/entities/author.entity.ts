import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;
}
