import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../../../constants/constants';
import { BaseGetByFiltersRequestDTO } from './base.getbyfilters.dto';
import { Validator } from 'class-validator';
const validator = new Validator();

describe('Suite test  BaseFindManyRequestDTO', () => {
  describe('Tests flow Sort params', () => {
    it('must be true if all parameters have been entered', async () => {
      const dto = new BaseGetByFiltersRequestDTO();
      dto.sortOrder = SortOrderEnum.DESC;
      dto.sortParam = DEFAULT_FIELDNAME_ORDER_BY;
      const errors = await validator.validate(dto);
      expect(errors.length).toEqual(0);
    });
    it('must be true if sortOrder was not informed', async () => {
      const dto = new BaseGetByFiltersRequestDTO();
      dto.sortParam = DEFAULT_FIELDNAME_ORDER_BY;
      const errors = await validator.validate(dto);
      expect(errors.length).toEqual(1);
    });
    it('must be true if sortParam was not informed', async () => {
      const dto = new BaseGetByFiltersRequestDTO();
      dto.sortOrder = SortOrderEnum.DESC;
      const errors = await validator.validate(dto);
      expect(errors.length).toEqual(1);
    });
  });
});
