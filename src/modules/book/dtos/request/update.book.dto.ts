import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBookRequestDTO {
  @ApiPropertyOptional({
    description: 'The name of book',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'number of ISBN',
  })
  @IsOptional()
  isbn?: string;

  @ApiPropertyOptional({
    description: 'Name author',
    required: false,
  })
  @IsOptional()
  author?: string;
}
