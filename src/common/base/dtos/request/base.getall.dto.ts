import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { OperatorQueryEnum as OpqEnum } from '../../../enums/operatorquery.enum';
import { PatternQueryEnum } from '../../../enums/patternquery.enum';
import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { TransformUtils } from '../../../utils/transform.utils';
import { IsInteger } from '../../../utils/validators/isinterger.validator';
import { IBaseFilter } from '../../interfaces/base.filter.dto';

export class BaseGetAllRequestDTO implements IBaseFilter {
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
    description: 'Record creation date',
    type: String,
  })
  @IsDate()
  @IsOptional()
  createAt?: Date;

  @ApiPropertyOptional({
    description: 'Record update date',
    type: String,
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiPropertyOptional({
    description: 'Record delete date',
    type: String,
  })
  @IsDate()
  @IsOptional()
  deletedAt?: Date;

  @ApiPropertyOptional({
    description: 'Records deleteds',
    type: Boolean,
  })
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @IsOptional()
  @IsBoolean()
  withDeleted?: boolean;

  @ApiPropertyOptional({
    description: 'Records with relations',
    type: Boolean,
  })
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @IsBoolean()
  @IsOptional()
  withRelations?: boolean;

  @ApiPropertyOptional({
    description: 'Pattern Matching field',
    type: String,
  })
  @IsString()
  @ValidateIf((prop) => !!prop.operatorMatching)
  @IsNotEmpty()
  fieldMatching: string;

  @ApiPropertyOptional({
    description: 'Correspondence operator',
    enum: OpqEnum,
  })
  @IsEnum(OpqEnum, {
    message: `must be ${OpqEnum.LIKE} or ${OpqEnum.ILIKE} or ${OpqEnum.NOT_LIKE} or ${OpqEnum.NOT_ILIKE}`,
  })
  @ValidateIf((prop) => !!prop.fieldMatching)
  @IsNotEmpty()
  operatorMatching: OpqEnum;

  @ApiPropertyOptional({
    description: 'Pattern Matching value',
    type: String,
  })
  @IsString()
  @ValidateIf(
    (prop) =>
      !!prop.patternMatching || !!prop.operatorMatching || !!prop.fieldMatching,
  )
  @IsNotEmpty()
  valueMatching: string;

  @ApiPropertyOptional({
    description: 'Pattern correspondence',
    enum: PatternQueryEnum,
  })
  @IsEnum(PatternQueryEnum, {
    message: `must be ${PatternQueryEnum.START_WITH} or ${PatternQueryEnum.END_WITH} or ${PatternQueryEnum.IN_BETWEEN}`,
  })
  @ValidateIf((prop) => !!prop.valueMatching)
  @IsNotEmpty()
  patternMatching: PatternQueryEnum;
}
