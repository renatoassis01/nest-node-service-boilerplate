import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OperatorQueryEnum } from '../../../enums/operatorquery.enum';
import { PatternQueryEnum } from '../../../enums/patternquery.enum';
import { IBasePatternDTO } from '../../interfaces/base.pattern.dto';

export class BasePatternMatchingRequestDTO implements IBasePatternDTO {
  @ApiPropertyOptional({
    description: 'Pattern Matching field',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiPropertyOptional({
    description: 'Correspondence operator',
    enum: OperatorQueryEnum,
  })
  @IsEnum(OperatorQueryEnum)
  @IsNotEmpty()
  operator: OperatorQueryEnum;

  @ApiPropertyOptional({
    description: 'Pattern Matching value',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({
    description: 'Pattern correspondence',
    enum: PatternQueryEnum,
  })
  @IsEnum(PatternQueryEnum, {
    message: `PatternQueryEnum must be ${PatternQueryEnum.START_WITH} or ${PatternQueryEnum.END_WITH} or ${PatternQueryEnum.IN_BETWEEN}`,
  })
  @IsNotEmpty()
  pattern: PatternQueryEnum;
}
