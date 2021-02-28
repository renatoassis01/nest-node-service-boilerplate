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
import { AuditFieldsEnum } from '../../../enums/auditfields.enum';
import { DateFormatEnum } from '../../../enums/dateformat.enum';
import { OperatorQueryEnum } from '../../../enums/operatorquery.enum';
import { PatternQueryEnum } from '../../../enums/patternquery.enum';
import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { DateUtils } from '../../../utils/date.utils';
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
    description: 'Record field audit date',
    enum: AuditFieldsEnum,
  })
  @ValidateIf((prop) => !!prop.startDateAudit || !!prop.endDateAudit)
  @IsNotEmpty()
  @IsEnum(AuditFieldsEnum, {
    message: `fieldAudit must be createdAt or updatedAt or deletedAt`,
  })
  fieldAudit?: AuditFieldsEnum;

  @ApiPropertyOptional({
    description: 'Record audit date start',
    type: Date,
  })
  @Transform(({ value }) =>
    DateUtils.formatDateToString(value, DateFormatEnum.YYYY_MM_DD),
  )
  @ValidateIf((prop) => !!prop.fieldAudit || !!prop.endDateAudit)
  @IsNotEmpty()
  startDateAudit?: string;

  @ApiPropertyOptional({
    description: 'Record audit date start',
    type: Date,
  })
  @Transform(({ value }) =>
    DateUtils.formatDateToString(value, DateFormatEnum.YYYY_MM_DD),
  )
  @ValidateIf((prop) => !!prop.fieldAudit || !!prop.startDateAudit)
  @IsNotEmpty()
  endDateAudit?: string;

  @ApiPropertyOptional({
    description: 'Records deleteds',
    type: Boolean,
  })
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @ValidateIf(
    (prop) =>
      !!prop.fieldAudit && prop.fieldAudit === AuditFieldsEnum.DELETED_AT,
  )
  @IsNotEmpty({ message: 'must be true if fieldAudit equal deleteAt' })
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
    enum: OperatorQueryEnum,
  })
  @IsEnum(OperatorQueryEnum, {
    message: `must be LIKE or ILIKE or NOT_LIKE or NOT_ILIKE`,
  })
  @ValidateIf((prop) => !!prop.fieldMatching)
  @IsNotEmpty()
  operatorMatching: OperatorQueryEnum;

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
    message: `must be START_WITH or END_WITH or IN_BETWEEN`,
  })
  @ValidateIf((prop) => !!prop.valueMatching)
  @IsNotEmpty()
  patternMatching: PatternQueryEnum;
}
