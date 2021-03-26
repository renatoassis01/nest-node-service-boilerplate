import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, ValidateIf, IsNotEmpty, IsEnum } from 'class-validator';
import { OperatorQueryEnum } from '../../../enums/operatorquery.enum';
import { PatternQueryEnum } from '../../../enums/patternquery.enum';
import { IBasePatternDTO } from '../../interfaces/base.pattern.dto';
import { BaseGetByFiltersRequestDTO } from './base.getbyfilters.dto';

export class BaseGetByFiltersWithPatternRequestDTO
  extends BaseGetByFiltersRequestDTO
  implements IBasePatternDTO {
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
    message: `must be START_WITH or END_WITH or CONTAINS`,
  })
  @ValidateIf((prop) => !!prop.valueMatching)
  @IsNotEmpty()
  patternMatching: PatternQueryEnum;
}
