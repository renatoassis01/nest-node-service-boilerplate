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

  public static buildWhereAuditFields(fieldsModel: Record<string, unknown>) {
    const startDate = fieldsModel?.startDateAudit;
    const endDate = fieldsModel?.endDateAudit;
    const fieldAudit = <string>fieldsModel?.fieldAudit;
    let condidtion;
    if (['createdAt', 'updatedAt', 'deleteAt'].includes(fieldAudit)) {
      condidtion = {
        [fieldAudit]: Raw(
          (alias) =>
            `CAST(${alias} as date) >= '${startDate}'::date AND CAST(${alias} as date) <= '${endDate}'::date`,
        ),
      };
    }
    return condidtion;
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
      'fieldMatching',
      'operatorMatching',
      'valueMatching',
      'patternMatching',
      'fieldAudit',
      'startDateAudit',
      'endDateAudit',
    ];

    const fieldConcats = !!omitAdditionalFields
      ? [...filterFields, ...omitAdditionalFields]
      : filterFields;

    return _.omit(filters, fieldConcats);
  }

  public static createPatternMatching(
    pattern: IBasePatternDTO,
    getSql?: boolean,
  ): { [field: string]: unknown } {
    if (
      _.isEmpty(pattern?.fieldMatching) ||
      _.isEmpty(pattern?.operatorMatching) ||
      _.isEmpty(pattern?.valueMatching) ||
      _.isEmpty(pattern?.patternMatching)
    )
      return;

    const {
      fieldMatching,
      operatorMatching,
      valueMatching,
      patternMatching,
    } = pattern;

    const operatorQuery = PatternMatchingUtils.tranformOperator(
      operatorMatching,
    );
    const mountedPattern = PatternMatchingUtils.mountPattern(
      patternMatching,
      valueMatching,
    );
    if (getSql)
      return {
        [fieldMatching]: Raw(
          (alias) => `${alias} ${operatorQuery} ${mountedPattern}`,
        ).getSql(fieldMatching),
      };
    return {
      [fieldMatching]: Raw(
        (alias) => `${alias} ${operatorQuery} ${mountedPattern}`,
      ),
    };
  }
}
