import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import { QueryUtils } from './query.utils';

describe('Suite teste QueryUtils', () => {
  describe('Tests function buildOrderBy', () => {
    it('must be true if the parameters are not null', () => {
      const sort = {
        ['fieldname']: 'ASC',
      };
      const builder: IBaseOrderByDTO = {
        sortParam: 'fieldname',
        sortOrder: SortOrderEnum.ASC,
      };
      const order = QueryUtils.buildOrderBy(builder);
      expect(order).toEqual(sort);
    });
    it('must be true if the parameters are null (default order)', () => {
      const sort = {
        [DEFAULT_FIELDNAME_ORDER_BY]: SortOrderEnum.DESC,
      };
      const builder: IBaseOrderByDTO = {
        sortParam: undefined,
        sortOrder: undefined,
      };
      const order = QueryUtils.buildOrderBy(builder);
      expect(order).toEqual(sort);
    });
  });
});
