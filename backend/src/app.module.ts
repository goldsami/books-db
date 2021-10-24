import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { AuthorEntity } from './authors/entities/author.entity';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookCyclesModule } from './book-cycles/book-cycles.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    AuthorsModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    BookCyclesModule,
    ListsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
