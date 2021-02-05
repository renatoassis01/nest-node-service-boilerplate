import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookModel } from '../../../../models/book.model';

export class BookResponseDTO {
  @ApiProperty({
    type: 'uuid',
    example: 'a58bdb1d-a690-4649-841c-8b55076fbddd',
  })
  readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly isbn: string;
  @ApiPropertyOptional()
  readonly author?: string;
  constructor(data: BookModel) {
    this.id = data.id;
    this.name = data.name;
    this.isbn = data.isbn;
    this.author = data?.author;
  }
}
