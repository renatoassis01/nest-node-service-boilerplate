import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
} from 'class-validator';
import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { IsInteger } from '../../../utils/validators/isinterger.validator';
import { IBaseOrderByDTO } from '../../interfaces/base.orderby.dto';
import { IBasePaginationDTO } from '../../interfaces/base.pagination.dto';

export class BaseFindManyRequestDTO
  implements IBasePaginationDTO, IBaseOrderByDTO {
  @ApiPropertyOptional({
    description: 'Records page',
    type: Number,
  })
  @IsInteger()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'Items per page',
    type: Number,
  })
  @IsInteger()
  @IsOptional()
  size?: number;

  @ApiPropertyOptional({
    description: 'Sorting property',
    type: String,
  })
  @IsString()
  @ValidateIf((prop) => !!prop.sortOrder)
  @IsNotEmpty()
  sortParam: string;

  @ApiPropertyOptional({
    description: 'Ordering Type',
    enum: SortOrderEnum,
  })
  @ValidateIf((prop) => !!prop.sortParam)
  @IsNotEmpty()
  @IsEnum(SortOrderEnum, {
    message: `sortOrder must be ${SortOrderEnum.ASC} or ${SortOrderEnum.DESC}`,
  })
  sortOrder: SortOrderEnum;
}
