import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ListEntity } from 'src/lists/entities/list.entity';
import { MarkEntity } from 'src/marks/entities/mark.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @OneToMany((type) => ListEntity, (list) => list.owner)
  lists: ListEntity[];

  @OneToMany((type) => MarkEntity, (mark) => mark.user)
  marks: MarkEntity[];
}
