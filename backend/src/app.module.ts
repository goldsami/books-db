import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookCyclesModule } from './book-cycles/book-cycles.module';
import { ListsModule } from './lists/lists.module';
import { MarksModule } from './marks/marks.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    AuthorsModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    BookCyclesModule,
    ListsModule,
    MarksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
