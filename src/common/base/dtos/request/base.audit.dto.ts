import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ValidateIf,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { AuditFieldsEnum } from '../../../enums/auditfields.enum';
import { DateFormatEnum } from '../../../enums/dateformat.enum';
import { DateUtils } from '../../../utils/date.utils';
import { TransformUtils } from '../../../utils/transform.utils';
import { IsDependentOf } from '../../../utils/validators/isdependentof.validator';
import { IBaseAuditFilterDTO } from '../../interfaces/base.audit.filter.dto';
import { BaseGetByFiltersRequestDTO } from './base.getbyfilters.dto';

export class BaseGetByFiltersWithAuditRequestDTO
  extends BaseGetByFiltersRequestDTO
  implements IBaseAuditFilterDTO {
  @ApiPropertyOptional({
    description: 'Field audit date',
    enum: AuditFieldsEnum,
  })
  @IsDependentOf(['startDateAudit', 'endDateAudit'])
  @IsOptional()
  @IsEnum(AuditFieldsEnum, {
    message: `fieldAudit must be createdAt or updatedAt or deletedAt`,
  })
  fieldAudit?: AuditFieldsEnum;

  @ApiPropertyOptional({
    description: 'Audit date start',
    type: Date,
  })
  @Transform(({ value }) =>
    DateUtils.formatDateToString(value, DateFormatEnum.YYYY_MM_DD_HH_MM),
  )
  @IsDateString()
  @IsDependentOf(['fieldAudit', 'endDateAudit'])
  @IsOptional()
  startDateAudit?: string;

  @ApiPropertyOptional({
    description: 'Audit date start',
    type: Date,
  })
  @IsDateString()
  @Transform(({ value }) =>
    DateUtils.formatDateToString(value, DateFormatEnum.YYYY_MM_DD_HH_MM),
  )
  @IsDependentOf(['fieldAudit', 'startDateAudit'])
  @IsOptional()
  endDateAudit?: string;

  @ApiPropertyOptional({
    description: 'Deleted records',
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
}
