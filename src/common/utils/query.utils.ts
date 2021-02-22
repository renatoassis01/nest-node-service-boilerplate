import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import * as _ from 'lodash';
import { IBasePatternDTO } from '../base/interfaces/base.pattern.dto';
import { PatternMatchingUtils } from './patternmatching.utils';
import { Raw } from 'typeorm';

export class QueryUtils {
  public static buildOrderBy(
    sortOptions: IBaseOrderByDTO,
  ): { [fieldName: string]: SortOrderEnum } {
    if (
      sortOptions.sortOrder === undefined ||
      sortOptions.sortParam === undefined
    )
      return { [DEFAULT_FIELDNAME_ORDER_BY]: SortOrderEnum.DESC };
    return { [sortOptions.sortParam]: sortOptions.sortOrder };
  }

  public static buildWhere(
    tenantId: string,
    fieldsModel: Record<string, unknown>,
  ) {
    return !!fieldsModel ? { tenantId, ...fieldsModel } : { tenantId };
  }

  public static getFieldsModel(
    filters: Record<string, unknown>,
    omitAdditionalFields?: string[],
  ): Pick<Record<string, unknown>, never> {
    const filterFields = [
      'page',
      'size',
      'sortOrder',
      'sortParam',
      'withDeleted',
      'withRelations',
      'patternMatching',
    ];

    const fieldConcats = !!omitAdditionalFields
      ? [...filterFields, ...omitAdditionalFields]
      : filterFields;
    return _.omit(filters, fieldConcats);
  }

  public static createPatternMatching(
    patternMatching: IBasePatternDTO,
    getSql?: boolean,
  ): { [field: string]: unknown } {
    const { field, operator, value, pattern } = patternMatching;

    const operatorQuery = PatternMatchingUtils.tranformOperator(operator);
    const mountedPattern = PatternMatchingUtils.mountPattern(pattern, value);
    if (getSql)
      return {
        [field]: Raw(
          (alias) => `${alias} ${operatorQuery} ${mountedPattern}`,
        ).getSql(field),
      };
    return {
      [field]: Raw((alias) => `${alias} ${operatorQuery} ${mountedPattern}`),
    };
  }
}
