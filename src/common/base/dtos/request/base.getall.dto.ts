import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { TransformUtils } from '../../../utils/transform.utils';
import { IsBoolean } from '../../../utils/validators/isboolean.validator';
import { IsInteger } from '../../../utils/validators/isinterger.validator';
import { IBaseOrderByDTO } from '../../interfaces/base.orderby.dto';
import { IBasePaginationDTO } from '../../interfaces/base.pagination.dto';

export class BaseGetAllRequestDTO
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

  @ApiPropertyOptional({
    description: 'User request',
    type: String,
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Records deleteds',
    type: Boolean,
  })
  @Transform((value) => TransformUtils.ToBoolean(value))
  @IsBoolean()
  @IsOptional()
  withDeleted?: boolean;
}
