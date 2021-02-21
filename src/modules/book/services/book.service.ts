import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repositories/book.repository';
import { CreateBookRequestDTO } from '../dtos/request/create.book.dto';
import { GetAllBookRequestDTO } from '../dtos/request/getall.book.dto';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { IGetAllResult } from '../../../common/interfaces/getallresult';
import { BookModel } from '../models/book.model';
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

  public async getAll(
    tenantId: string,
    filters: GetAllBookRequestDTO,
  ): Promise<IGetAllResult> {
    return await this.repository.getAll(tenantId, filters);
  }

  public async getById(tenantId: string, id: string): Promise<BookModel> {
    const book = await this.repository.getById(tenantId, id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  public async update(
    tenantId: string,
    userId: string,
    id: string,
    dto: UpdateBookRequestDTO,
  ): Promise<BookModel> {
    const result = await this.repository.updateById(tenantId, userId, id, dto);
    if (!result) throw new NotFoundException('Book not found');
    return result;
  }

  public async deleteById(tenantId: string, id: string): Promise<string> {
    const isBookDeleted = await this.repository.deleteById(tenantId, id);
    if (!isBookDeleted) throw new NotFoundException('Book not found');
    return 'Book deleted';
  }

  public async removeById(
    tenantId: string,
    id: string,
    userId: string,
  ): Promise<string> {
    const isBookDeleted = await this.repository.removeById(
      tenantId,
      id,
      userId,
    );
    if (!isBookDeleted) throw new NotFoundException('Book not found');
    return 'Book deleted';
  }
}
