import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookModel } from 'src/models/book.model';
import { BookRepository } from './book.repository';
import { CreateBookRequestDTO } from './book.request.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly repository: BookRepository,
  ) {}

  public async create(data: CreateBookRequestDTO): Promise<BookModel> {
    const book = await this.repository.create(data);
    return book;
  }
  public async find(id: number): Promise<BookModel> {
    const book = await this.repository.findById(id);
    console.log(book);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
}
