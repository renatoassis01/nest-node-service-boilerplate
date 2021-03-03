import { IBaseOrderByDTO } from '../base/interfaces/base.orderby.dto';
import { SortOrderEnum } from '../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../constants/constants';
import { QueryUtils } from './query.utils';
import { IBaseFilter } from '../base/interfaces/base.filter.dto';
import { FakerUtils } from './faker.utils';
import { OperatorQueryEnum } from '../enums/operatorquery.enum';
import { PatternQueryEnum } from '../enums/patternquery.enum';
import { AuditFieldsEnum } from '../enums/auditfields.enum';
import { IBasePatternDTO } from '../base/interfaces/base.pattern.dto';
import { IBaseAuditFilter } from '../base/interfaces/base.audit.filter';

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
      const result = QueryUtils.excludeFieldsFilter({ ...filter, ...data }, [
        'additionalField',
      ]);
      expect(result).not.toContain('additionalField');
    });
  });

  describe('Tests function buildWherePatternMatching', () => {
    it('should be return null', () => {
      const data: IBasePatternDTO = {};
      const result = QueryUtils.buildWherePatternMatching(data);
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
      const result = QueryUtils.buildWherePatternMatching(data);
      expect(expectPattern).toBe(
        result[data.fieldMatching].getSql(data.fieldMatching),
      );
    });
  });
  describe('Tests function buildWhereAuditFields', () => {
    it('should be return null', () => {
      const data: IBaseAuditFilter = {};
      const result = QueryUtils.buildWhereAuditFields(data);
      expect(result).toBeUndefined();
    });
    it('should be return a audit filter date', () => {
      const data: IBaseAuditFilter = {
        fieldAudit: AuditFieldsEnum.CREATED_AT,
        startDateAudit: '2021-03-02',
        endDateAudit: '2021-03-02',
      };

      const expectFilter = `CAST(createdAt as date) >= '2021-03-02'::date
      AND CAST(createdAt as date) < CAST('2021-03-02'::date + interval 1 'day' as date)`;

      const result = QueryUtils.buildWhereAuditFields(data);
      expect(expectFilter).toBe(
        result.createdAt.getSql(AuditFieldsEnum.CREATED_AT),
      );
    });
  });
});
