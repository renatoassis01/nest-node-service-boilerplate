import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import * as _ from 'lodash';

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
    additionalFields?: string[],
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

    const fieldConcats = !!additionalFields
      ? [...filterFields, ...additionalFields]
      : filterFields;
    return _.omit(filters, fieldConcats);
  }
}
