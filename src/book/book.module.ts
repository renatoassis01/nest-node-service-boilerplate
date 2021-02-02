import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  providers: [BookService],
  exports: [BookService],
  controllers: [BookController],
})
export class BookModule {}
