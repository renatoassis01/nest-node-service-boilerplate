import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseGetByFiltersFullRequestDTO } from '../../../../common/base/dtos/request/base.getbyfilters.full.dto';

export class GetByFiltersBookRequestDTO extends BaseGetByFiltersFullRequestDTO {
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
