import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import { QueryUtils } from './query.utils';
import { IBaseFilter } from '../base/interfaces/base.filter.dto';
import { FakerUtils } from './faker.utils';
import { OperatorQueryEnum } from '../enums/operatorquery.enum';
import { PatternQueryEnum } from '../enums/patternquery.enum';

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
  describe('Tests function excludeFieldsFilter', () => {
    const filter: IBaseFilter = {
      page: 1,
      size: 10,
      sortOrder: SortOrderEnum.ASC,
      sortParam: 'name',
      withDeleted: true,
      withRelations: true,
      fieldMatching: 'name',
      operatorMatching: OperatorQueryEnum.ILIKE,
      valueMatching: FakerUtils.faker().random.word(),
      patternMatching: PatternQueryEnum.END_WITH,
    };

    it('must be true if return object property omit', () => {
      const data = {
        name: FakerUtils.faker().name.firstName(),
        lastname: FakerUtils.faker().name.lastName(),
        age: 33,
      };

      const result = QueryUtils.excludeFieldsFilter({ ...filter, ...data });
      expect(result).not.toContain('page');
      expect(result).not.toContain('size');
      expect(result).not.toContain('sortOrder');
      expect(result).not.toContain('sortParam');
      expect(result).not.toContain('withDeleted');
      expect(result).not.toContain('withRelations');
      expect(result).not.toContain('fieldMatching');
      expect(result).not.toContain('operatorMatching');
      expect(result).not.toContain('valueMatching');
      expect(result).not.toContain('patternMatching');
    });
    it('must be true if return object property omit additional field', () => {
      const data = {
        name: FakerUtils.faker().name.firstName(),
        lastname: FakerUtils.faker().name.lastName(),
        age: 33,
        additionalField: FakerUtils.faker().random.word(),
      };
      const result = QueryUtils.excludeFieldsFilter({ ...filter, ...data }, [
        'additionalField',
      ]);
      expect(result).not.toContain('additionalField');
    });
  });
});
