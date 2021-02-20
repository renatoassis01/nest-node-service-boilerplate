import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import * as _ from 'lodash';
import { Brackets, IsNull, Not, Raw } from 'typeorm';

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

  public static buildWhere(tenantId: string, filters: Record<string, unknown>) {
    const fieldsModel = QueryUtils.getFieldsModel(filters);
    return !!fieldsModel ? { tenantId, ...fieldsModel } : { tenantId };
  }

  public static getFieldsModel(
    filters: Record<string, unknown>,
  ): Pick<any, string | number | symbol> {
    return _.omit(filters, [
      'page',
      'size',
      'sortOrder',
      'sortParam',
      'withDeleted',
      'withRelations',
    ]);
  }
}
