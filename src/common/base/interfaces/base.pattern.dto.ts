import { OperatorQueryEnum } from '../../enums/operatorquery.enum';
import { PatternQueryEnum } from '../../enums/patternquery.enum';

export interface IBasePatternDTO {
  field: string;
  operator: OperatorQueryEnum;
  value: string;
  pattern: PatternQueryEnum;
}
