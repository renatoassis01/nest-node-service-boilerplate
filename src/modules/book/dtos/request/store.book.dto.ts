import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class StoreBookRequestDTO {
  @ApiProperty({
    description: 'The name of book',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'number of ISBN',
  })
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({
    description: 'Name author',
    required: false,
  })
  @IsOptional()
  author?: string;
}
