import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { AuthorEntity } from './authors/entities/author.entity';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    AuthorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'admin',
      database: 'books-db',
      entities: [UserEntity, AuthorEntity, BookEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
