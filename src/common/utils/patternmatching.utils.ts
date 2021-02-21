import { OperatorQueryEnum } from '../enums/operatorquery.enum';
import { PatternQueryEnum } from '../enums/patternquery.enum';

export class PatternMatchingUtils {
  public static tranformOperator(operator: OperatorQueryEnum): string {
    switch (operator) {
      case OperatorQueryEnum.LIKE:
        return 'LIKE';
      case OperatorQueryEnum.ILIKE:
        return 'ILIKE';
      case OperatorQueryEnum.NOT_LIKE:
        return 'NOT LIKE';

      case OperatorQueryEnum.NOT_ILIKE:
        return 'NOT ILIKE';
    }
  }

  public static mountPattern(pattern: PatternQueryEnum, value: string): string {
    switch (pattern) {
      case PatternQueryEnum.START_WITH:
        return `'%${value}'`;
      case PatternQueryEnum.IN_BETWEEN:
        return `'%${value}%'`;
      case PatternQueryEnum.END_WITH:
        return `'%${value}%'`;
    }
  }
}
