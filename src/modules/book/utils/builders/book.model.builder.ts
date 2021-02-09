import { BaseModelBuiler } from '../../../../common/base/builders/base.model.builder';
import { BookModel } from '../../../../models/book.model';

export class BookModelBuilder extends BaseModelBuiler<
  BookModelBuilder,
  BookModel
> {
  withName(name: string): BookModelBuilder {
    this.builder.name = name;
    return this;
  }

  withISBN(isbn: string): BookModelBuilder {
    this.builder.isbn = isbn;
    return this;
  }

  withAuthor(author: string): BookModelBuilder {
    this.builder.author = author;
    return this;
  }
}
