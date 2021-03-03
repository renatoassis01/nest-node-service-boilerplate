import { OperatorQueryEnum } from '../../enums/operatorquery.enum';
import { PatternQueryEnum } from '../../enums/patternquery.enum';

export interface IBasePatternDTO {
  fieldMatching?: string;
  operatorMatching?: OperatorQueryEnum;
  valueMatching?: string;
  patternMatching?: PatternQueryEnum;
}
