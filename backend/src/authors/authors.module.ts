import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorEntity } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
