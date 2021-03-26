import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import * as _ from 'lodash';
import { IBasePatternDTO } from '../base/interfaces/base.pattern.dto';
import { PatternMatchingUtils } from './patternmatching.utils';
import { FindOperator, Raw } from 'typeorm';
import { IBaseAuditFilterDTO } from '../base/interfaces/base.audit.filter.dto';
import { AuditFieldsEnum } from '../enums/auditfields.enum';
import { DateUtils } from './date.utils';
import { FilterRequestDTO } from '../types/filter.type.dto';

export class FilterUtils {
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

  public static buildWhere<T>(tenantId: string, fieldsModel: T) {
    return !!fieldsModel ? { tenantId, ...fieldsModel } : { tenantId };
  }

  /**
   * Remove os campos do filtro padrão.
   * @param filters
   * - Campos adicionais que não fazem parte de um model pode ser passado aqui
   * @param omitAdditionalFields
   */
  public static excludeFieldsFilter(
    filters: Record<symbol, unknown>,
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

  public static buildWherePatternMatching(
    pattern: IBasePatternDTO,
  ): { [field: string]: FindOperator<any> } | undefined {
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

    return {
      [fieldMatching]: Raw(
        (alias) => `${alias} ${operatorQuery} ${mountedPattern}`,
      ),
    };
  }

  /**
   * Monta um filtro de data baseado no DTO de filtro
   * fieldname >= startDate and fieldname <= endDate
   * @param fieldsModel
   */
  public static buildWhereAuditFields(
    fieldsModel: IBaseAuditFilterDTO,
  ): { [field: string]: FindOperator<any> } | undefined {
    if (
      _.isEmpty(fieldsModel?.startDateAudit) ||
      _.isEmpty(fieldsModel?.endDateAudit) ||
      _.isEmpty(fieldsModel?.fieldAudit)
    )
      return;
    const { startDateAudit, endDateAudit, fieldAudit } = fieldsModel;
    let condidtion: any;
    if (
      [
        AuditFieldsEnum.CREATED_AT,
        AuditFieldsEnum.UPDATED_AT,
        AuditFieldsEnum.DELETED_AT,
      ].includes(fieldAudit)
    ) {
      const endDatePlusOne = DateUtils.addOneDayToString(endDateAudit);
      condidtion = {
        [fieldAudit]: Raw(
          (alias) =>
            `CAST(${alias} as date) >= '${startDateAudit}'::date
              AND CAST(${alias} as date) < '${endDatePlusOne}'::date)`,
        ),
      };
    }
    return condidtion;
  }

  public static isAllowedProperty<T>(
    allowFields: Array<keyof T>,
    constraint: 'sortParam' | 'fieldMatching',
    filters: FilterRequestDTO<T>,
  ): boolean {
    const value = filters[constraint];
    if (!value) return true;
    return allowFields.filter((field) => field === value).length > 0;
  }
}
