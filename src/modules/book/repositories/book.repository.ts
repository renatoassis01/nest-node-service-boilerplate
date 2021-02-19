import { BookModel } from '../models/book.model';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/base/repositories/base.repository';
@EntityRepository(BookModel)
export class BookRepository extends BaseRepository<BookModel> {
  public async findByName(name: string): Promise<BookModel> {
    return this.repository.findOne({ name });
  }
}
