import { Module } from '@nestjs/common';
import { BookService } from './services/book.service';
import { BookController } from './controllers/book.controller';
import { BookRepository } from './repositories/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  providers: [BookService],
  exports: [BookService],
  controllers: [BookController],
})
export class BookModule {}
