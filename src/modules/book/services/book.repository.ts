import { BaseRepository } from 'src/common/base/base.repository';
import { BookModel } from 'src/models/book.model';
import { EntityRepository } from 'typeorm';
@EntityRepository(BookModel)
export class BookRepository extends BaseRepository<BookModel> {}
