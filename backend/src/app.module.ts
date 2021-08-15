import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { AuthorEntity } from '@authors/entities/author.entity';
import { AuthorsModule } from '@authors/authors.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'admin',
      database: 'books-db',
      entities: [UserEntity, AuthorEntity],
      synchronize: true,
    }),
    AuthorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
