import { BookModel } from '../../../models/book.model';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/base/repository/base.repository';
@EntityRepository(BookModel)
export class BookRepository extends BaseRepository<BookModel> {}
