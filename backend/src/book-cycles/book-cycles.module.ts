import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCyclesController } from './book-cycles.controller';
import { BookCyclesService } from './book-cycles.service';
import { BookCycleEntity } from './entities/book-cycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCycleEntity])],
  controllers: [BookCyclesController],
  providers: [BookCyclesService],
  exports: [BookCyclesService],
})
export class BookCyclesModule {}
