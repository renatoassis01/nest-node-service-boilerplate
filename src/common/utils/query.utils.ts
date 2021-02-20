import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';

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
}
