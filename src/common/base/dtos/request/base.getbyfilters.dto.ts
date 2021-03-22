import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { TransformUtils } from '../../../utils/transform.utils';
import { IsInteger } from '../../../utils/validators/isinterger.validator';
import { IBaseOrderByDTO } from '../../interfaces/base.orderby.dto';

export class BaseGetByFiltersRequestDTO
  implements IBaseOrderByDTO, IBaseOrderByDTO {
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
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @IsBoolean()
  @IsOptional()
  withDeleted?: boolean;

  @ApiPropertyOptional({
    description: 'Records with relations',
    type: Boolean,
  })
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @IsBoolean()
  @IsOptional()
  withRelations?: boolean;
}
