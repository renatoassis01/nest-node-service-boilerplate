import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { AuditFieldsEnum } from '../../../enums/auditfields.enum';
import { BaseGetByFiltersWithAuditRequestDTO } from './base.audit.dto';

const target: ValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
});

const metadata: ArgumentMetadata = {
  type: 'query',
  metatype: BaseGetByFiltersWithAuditRequestDTO,
  data: '',
};

describe('Suite Test for BaseGetByFiltersWithAuditRequestDTO success CASES', () => {
  it('validate DTO empty', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    const result = await target.transform(dto, metadata);
    expect(result).toEqual({});
  });

  it('validate fieldAudit with startDateAudit,endDateAudit', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.fieldAudit = AuditFieldsEnum.CREATED_AT;
    dto.startDateAudit = '2020-01-01';
    dto.endDateAudit = '2020-01-01';

    expect(await target.transform(dto, metadata)).toEqual({
      ...dto,
      startDateAudit: '2020-01-01 00:00',
      endDateAudit: '2020-01-01 00:00',
    });
  });

  it('validate fieldAudit with startDateAudit,endDateAudit, withDeleted', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.fieldAudit = AuditFieldsEnum.DELETED_AT;
    dto.startDateAudit = '2020-01-01';
    dto.endDateAudit = '2020-01-01';
    dto.withDeleted = true;

    expect(await target.transform(dto, metadata)).toEqual({
      ...dto,
      startDateAudit: '2020-01-01 00:00',
      endDateAudit: '2020-01-01 00:00',
    });
  });
});

describe('Suite Test for BaseGetByFiltersWithAuditRequestDTO error CASES', () => {
  it('validate fieldAudit without startDateAudit,endDateAudit', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.fieldAudit = AuditFieldsEnum.CREATED_AT;

    await target.transform(dto, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'The fieldAudit property also depends: startDateAudit,endDateAudit',
      ]);
    });
  });

  it('validate startDateAudit without fieldAudit,endDateAudit', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.startDateAudit = '2020-01-01';

    await target.transform(dto, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'The startDateAudit property also depends: fieldAudit,endDateAudit',
      ]);
    });
  });

  it('validate endDateAudit without fieldAudit,endDateAudit', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.endDateAudit = '2020-01-01';

    await target.transform(dto, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'The endDateAudit property also depends: fieldAudit,startDateAudit',
      ]);
    });
  });

  it('validate fieldAudit with startDateAudit,endDateAudit, but whitout withDelete param', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.fieldAudit = AuditFieldsEnum.DELETED_AT;
    dto.startDateAudit = '2020-01-01';
    dto.endDateAudit = '2020-01-01';

    await target.transform(dto, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'withDeleted must be a boolean value',
        'must be true if fieldAudit equal deleteAt',
      ]);
    });
  });

  it('validate startDateAudit format date invalid', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.fieldAudit = AuditFieldsEnum.CREATED_AT;
    dto.startDateAudit = 'xxxxxx';
    dto.endDateAudit = '2020-01-01';

    await target.transform(dto, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'startDateAudit must be a valid ISO 8601 date string',
      ]);
    });
  });

  it('validate endDateAudit format date invalid', async () => {
    const dto = new BaseGetByFiltersWithAuditRequestDTO();
    dto.fieldAudit = AuditFieldsEnum.CREATED_AT;
    dto.startDateAudit = '2020-01-01';
    dto.endDateAudit = 'xxxxxx';

    await target.transform(dto, metadata).catch((err) => {
      expect(err.getResponse().message).toEqual([
        'endDateAudit must be a valid ISO 8601 date string',
      ]);
    });
  });
});
