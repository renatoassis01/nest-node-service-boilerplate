import { SortOrderEnum } from '../../enums/sortorder.enum';

export interface IBaseOrderByDTO {
  sortParam?: string;
  sortOrder?: SortOrderEnum;
}
