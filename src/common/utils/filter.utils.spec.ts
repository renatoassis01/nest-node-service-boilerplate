import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import { FilterUtils } from './filter.utils';
import { IBaseFilter } from '../base/interfaces/base.filter.dto';
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
      fieldAudit: AuditFieldsEnum.CREATED_AT,
      startDateAudit: '2021-01-11',
      endDateAudit: '2021-01-11',
    };

    it('must be true if return object property omit', () => {
      const data = {
        name: FakerUtils.faker().name.firstName(),
        lastname: FakerUtils.faker().name.lastName(),
        age: 33,
      };

      const result = FilterUtils.excludeFieldsFilter({ ...filter, ...data });
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
      expect(result).not.toContain('fieldAudit');
      expect(result).not.toContain('startDateAudit');
      expect(result).not.toContain('endDateAudit');
    });
    it('must be true if return object property omit additional field', () => {
      const data = {
        name: FakerUtils.faker().name.firstName(),
        lastname: FakerUtils.faker().name.lastName(),
        age: 33,
        additionalField: FakerUtils.faker().random.word(),
      };
      const result = FilterUtils.excludeFieldsFilter({ ...filter, ...data }, [
        'additionalField',
      ]);
      expect(result).not.toContain('additionalField');
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
      expect(result.createdAt.getSql(AuditFieldsEnum.CREATED_AT)).toContain(
        "'2021-03-03'::date",
      );
    });
  });

  describe.only('Tests function isAllowedProperty', () => {
    class MyModel extends BaseModel {
      name: string;
      lastname: string;
      age: number;
    }

    it('should be return null CASE pattern', () => {
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
  });
});
