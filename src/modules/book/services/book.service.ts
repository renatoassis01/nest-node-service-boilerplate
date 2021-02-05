import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repository/book.repository';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { FindAllBookRequestDTO } from '../dtos/request/findall.book.dto';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { IFindManyResult } from '../../../common/interfaces/findmanyresult';
import { BookModel } from '../../../models/book.model';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly repository: BookRepository,
  ) {}

  public async create(
    tenantId: string,
    userId: string,
    data: CreateBookRequestDTO,
  ): Promise<BookModel> {
    const book = await this.repository.create(tenantId, userId, data);
    return book;
  }

  public async findAll(
    tenantid: string,
    filters: FindAllBookRequestDTO,
  ): Promise<IFindManyResult> {
    return await this.repository.findAll(tenantid, filters);
  }

  public async findById(tenantid: string, id: string): Promise<BookModel> {
    const book = await this.repository.findById(tenantid, id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  public async update(
    tenantid: string,
    userId: string,
    id: string,
    dto: UpdateBookRequestDTO,
  ): Promise<void> {
    const book = await this.repository.partialUpdate(tenantid, userId, id, dto);
    if (!book) throw new NotFoundException('Book not found');
  }
}
