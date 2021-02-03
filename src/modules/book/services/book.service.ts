import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookModel } from 'src/models/book.model';
import { BookRepository } from './book.repository';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly repository: BookRepository,
  ) {}

  public async create(
    tenantId: string,
    data: CreateBookRequestDTO,
  ): Promise<BookModel> {
    const book = await this.repository.create(tenantId, data);
    return book;
  }
  public async find(tenantid: string, id: string): Promise<BookModel> {
    const book = await this.repository.findById(tenantid, id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
}
