import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import { FilterUtils } from './filter.utils';
import { FakerUtils } from './faker.utils';
import { OperatorQueryEnum } from '../enums/operatorquery.enum';
import { PatternQueryEnum } from '../enums/patternquery.enum';
import { AuditFieldsEnum } from '../enums/auditfields.enum';
import { IBasePatternDTO } from '../base/interfaces/base.pattern.dto';
import { IBaseAuditFilterDTO } from '../base/interfaces/base.audit.filter.dto';
import { BaseModel } from '../base/models/base.model';

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
      const order = FilterUtils.buildOrderBy(builder);
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
      const order = FilterUtils.buildOrderBy(builder);
      expect(order).toEqual(sort);
    });
  });

  describe('Tests function buildWherePatternMatching', () => {
    it('should be return null', () => {
      const data: IBasePatternDTO = {};
      const result = FilterUtils.buildWherePatternMatching(data);
      expect(result).toBeUndefined();
    });
    it('should be return a pattern', () => {
      const valueMatching = FakerUtils.faker().name.firstName();
      const data: IBasePatternDTO = {
        fieldMatching: 'name',
        operatorMatching: OperatorQueryEnum.ILIKE,
        valueMatching,
        patternMatching: PatternQueryEnum.END_WITH,
      };
      const expectPattern = `${[data.fieldMatching]} ${
        data.operatorMatching
      } '%${valueMatching}'`;
      const result = FilterUtils.buildWherePatternMatching(data);
      expect(expectPattern).toBe(
        result[data.fieldMatching].getSql(data.fieldMatching),
      );
    });
  });

  describe('Tests function buildWhereAuditFields', () => {
    it('should be return null', () => {
      const data: IBaseAuditFilterDTO = {};
      const result = FilterUtils.buildWhereAuditFields(data);
      expect(result).toBeUndefined();
    });
    it('should be return a audit filter date', () => {
      const data: IBaseAuditFilterDTO = {
        fieldAudit: AuditFieldsEnum.CREATED_AT,
        startDateAudit: '2021-03-02',
        endDateAudit: '2021-03-02',
      };
      const result = FilterUtils.buildWhereAuditFields(data);

      expect(result.createdAt.type).toEqual('between');
      expect(result.createdAt.value).toEqual(['2021-03-02', '2021-03-02']);
    });
  });

  describe('Tests function isAllowedProperty', () => {
    class MyModel extends BaseModel {
      name: string;
      lastname: string;
      age: number;
    }

    it('should be return true if fieldMatching  allow', () => {
      const filters: IBasePatternDTO = {
        fieldMatching: 'name',
        operatorMatching: OperatorQueryEnum.ILIKE,
        valueMatching: FakerUtils.faker().name.firstName(),
        patternMatching: PatternQueryEnum.END_WITH,
      };
      const isAllow = FilterUtils.isAllowedProperty<MyModel>(
        ['name'],
        'fieldMatching',
        filters,
      );
      expect(isAllow).toBe(true);
    });
    it('should be return false if fieldMatching not allow', () => {
      const filters: IBasePatternDTO = {
        fieldMatching: 'name',
        operatorMatching: OperatorQueryEnum.ILIKE,
        valueMatching: FakerUtils.faker().name.firstName(),
        patternMatching: PatternQueryEnum.END_WITH,
      };
      const isAllow = FilterUtils.isAllowedProperty<MyModel>(
        ['lastname'],
        'fieldMatching',
        filters,
      );
      expect(isAllow).toBe(false);
    });
    it('should be return true if sortParam  allow', () => {
      const filters: IBaseOrderByDTO = {
        sortOrder: SortOrderEnum.ASC,
        sortParam: 'name',
      };
      const isAllow = FilterUtils.isAllowedProperty<MyModel>(
        ['name'],
        'sortParam',
        filters,
      );
      expect(isAllow).toBe(true);
    });
    it('should be return false if sortParam not allow', () => {
      const filters: IBaseOrderByDTO = {
        sortOrder: SortOrderEnum.ASC,
        sortParam: 'name',
      };
      const isAllow = FilterUtils.isAllowedProperty<MyModel>(
        ['lastname'],
        'sortParam',
        filters,
      );
      expect(isAllow).toBe(false);
    });
  });
});
