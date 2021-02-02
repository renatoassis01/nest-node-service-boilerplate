import { BaseRepository } from 'src/common/base/base.repository';
import { BookModel } from 'src/models/book.model';
import { EntityRepository } from 'typeorm';
import { CreateBookRequestDTO } from '../dtos/request/create.book.request.dto';

@EntityRepository(BookModel)
export class BookRepository extends BaseRepository<BookModel> {
  public async create(data: CreateBookRequestDTO): Promise<BookModel> {
    const newBook = this.repository.create(data);
    return this.repository.save(newBook);
  }
}
