import { BookModel } from 'src/models/book.model';

export class BookResponseDTO {
  readonly id: number;
  readonly name: string;
  readonly isbn: string;
  readonly author?: string;
  constructor(data: BookModel) {
    this.id = data.id;
    this.name = data.name;
    this.isbn = data.isbn;
    this.author = data?.author;
  }
}
