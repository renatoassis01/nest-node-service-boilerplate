import { SortOrderEnum } from '../../../enums/sortorder.enum';
import { DEFAULT_FIELDNAME_ORDER_BY } from '../../../constants/constants';
import { BaseGetByFiltersRequestDTO } from './base.getbyfilters.dto';
import { Validator } from 'class-validator';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
const validator = new Validator();

describe('Suite test BaseGetByFiltersRequestDTO', () => {
  describe('Tests sort params', () => {
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

  describe('Tests transform boolean string to boolean', () => {
    const target: ValidationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    const metadata: ArgumentMetadata = {
      type: 'query',
      metatype: BaseGetByFiltersRequestDTO,
      data: '',
    };

    it('convert withDeleted to boolean', async () => {
      const request = {
        withDeleted: 'true',
      };
      expect(await target.transform(request, metadata)).toEqual({
        withDeleted: true,
      });
    });

    it('convert withRelations to boolean', async () => {
      const request = {
        withRelations: 'true',
      };
      expect(await target.transform(request, metadata)).toEqual({
        withRelations: true,
      });
    });

    it('not convert withDeleted to boolean', async () => {
      const request = {
        withDeleted: '1',
      };

      await target.transform(request, metadata).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'withDeleted must be a boolean value',
        ]);
      });
    });

    it('not convert withRelations to boolean', async () => {
      const request = {
        withRelations: '1',
      };

      await target.transform(request, metadata).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'withRelations must be a boolean value',
        ]);
      });
    });
  });
});
