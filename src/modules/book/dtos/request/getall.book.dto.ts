import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseGetAllRequestDTO } from '../../../../common/base/dtos/request/base.getall.dto';

export class GetAllBookRequestDTO extends BaseGetAllRequestDTO {
  @ApiPropertyOptional({
    description: 'name book',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'ISBN book',
  })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiPropertyOptional({
    description: 'Author book',
  })
  @IsString()
  @IsOptional()
  author?: string;
}
