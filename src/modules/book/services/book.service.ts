import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repositories/book.repository';
import { StoreBookRequestDTO } from '../dtos/request/store.book.dto';
import { GetByFiltersBookRequestDTO } from '../dtos/request/getbyfilters.book.dto';
import { UpdateBookRequestDTO } from '../dtos/request/update.book.dto';
import { IGetByFiltersResult } from '../../../common/interfaces/getbyfiltersresult';
import { BookModel } from '../models/book.model';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly repository: BookRepository,
  ) {}

  public async store(
    tenantId: string,
    userId: string,
    data: StoreBookRequestDTO,
  ): Promise<BookModel> {
    const book = await this.repository.store(tenantId, userId, data);
    return book;
  }

  public async getByFilters(
    tenantId: string,
    filters: GetByFiltersBookRequestDTO,
  ): Promise<IGetByFiltersResult> {
    return await this.repository.getByFilters(tenantId, filters);
  }

  public async getById(
    tenantId: string,
    id: string,
    withDeleted = false,
  ): Promise<BookModel> {
    const book = await this.repository.getById(tenantId, id, withDeleted);
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

  public async deleteById(tenantId: string, id: string): Promise<void> {
    const isBookDeleted = await this.repository.deleteById(tenantId, id);
    if (!isBookDeleted) throw new NotFoundException('Book not found');
  }

  public async disableById(
    tenantId: string,
    userId: string,
    id: string,
  ): Promise<void> {
    const isBookDeleted = await this.repository.disableById(
      tenantId,
      userId,
      id,
    );
    if (!isBookDeleted) throw new NotFoundException('Book not found');
  }

  public async enableById(
    tenantId: string,
    userId: string,
    id: string,
  ): Promise<void> {
    const isBookEnabled = await this.repository.enableById(
      tenantId,
      userId,
      id,
    );
    if (!isBookEnabled) throw new NotFoundException('Book not found');
  }
}
