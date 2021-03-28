import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookModel } from '../../models/book.model';

export class BookResponseDTO {
  @ApiProperty({
    type: 'uuid',
    example: 'a58bdb1d-a690-4649-841c-8b55076fbddd',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    example: 'name',
  })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: '978-3-16-148410-0',
  })
  readonly isbn: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'fulano',
  })
  readonly author?: string;

  @ApiProperty({
    type: 'string',
    example: '2021-03-28T05:35:03.523Z',
  })
  readonly createdAt: Date;

  constructor(data: BookModel) {
    this.id = data.id;
    this.name = data.name;
    this.isbn = data.isbn;
    this.author = data?.author;
    this.createdAt = data.createdAt;
  }
}
