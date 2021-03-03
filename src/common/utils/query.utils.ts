import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import * as _ from 'lodash';
import { IBasePatternDTO } from '../base/interfaces/base.pattern.dto';
import { PatternMatchingUtils } from './patternmatching.utils';
import { FindOperator, Raw } from 'typeorm';
import { IBaseAuditFilter } from '../base/interfaces/base.audit.filter';

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

  /**
   * Remove os campos do filtro padrão.
   * @param filters
   * - Campos adicionais que não fazem parte de um model pode ser passado aqui
   * @param omitAdditionalFields
   */
  public static excludeFieldsFilter(
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
    fieldsModel: IBaseAuditFilter,
  ): { [field: string]: FindOperator<any> } | undefined {
    if (
      _.isEmpty(fieldsModel?.startDateAudit) ||
      _.isEmpty(fieldsModel?.endDateAudit) ||
      _.isEmpty(fieldsModel?.fieldAudit)
    )
      return;
    const { startDateAudit, endDateAudit, fieldAudit } = fieldsModel;
    let condidtion: any;
    if (['createdAt', 'updatedAt', 'deletedAt'].includes(fieldAudit)) {
      condidtion = {
        [fieldAudit]: Raw(
          (alias) =>
            `CAST(${alias} as date) >= '${startDateAudit}'::date
              AND CAST(${alias} as date) < 'CAST(${endDateAudit}'::date + interval 1 'day' as date)`,
        ),
      };
    }
    return condidtion;
  }
}
