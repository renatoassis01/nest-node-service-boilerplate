import { IsEnum, IsOptional, Validator } from 'class-validator';
import { IsRequiredWhen } from './isrequiredwhen.validator';

const validator = new Validator();

enum TypePersonEnum {
  CANDIDATE = 'candidate',
  EMPLOYEE = 'employee',
  PROVIDER = 'provider',
}

class PersonRequestDTO {
  @IsOptional()
  name?: string;

  @IsRequiredWhen<PersonRequestDTO>([
    {
      values: ['candidate'],
      properties: ['name', 'gender', 'cellphone', 'email', 'socialNetwork'],
    },
    {
      values: ['employee', 'provider'],
      properties: ['name', 'cellphone', 'email'],
    },
  ])
  @IsEnum(TypePersonEnum, {
    message: `type must be ${TypePersonEnum.CANDIDATE}, ${TypePersonEnum.EMPLOYEE} or ${TypePersonEnum.PROVIDER}`,
  })
  type: TypePersonEnum;

  @IsOptional()
  cellphone?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  socialNetwork?: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  complement?: string;
}

describe('Suite teste class validator IsRequiredWhen()', () => {
  it('Should NOT return an error because all mandatory properties are fulfilled for this CASE 1', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.CANDIDATE;
    model.gender = 'male';
    model.cellphone = '999999999';
    model.email = 'machado@assis.com';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because all mandatory properties are filled in and some optional for this CASE 2', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.CANDIDATE;
    model.gender = 'male';
    model.cellphone = '999999999';
    model.email = 'machado@assis.com';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';
    model.complement = 'complement';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because all mandatory properties are fulfilled for this CASE 3', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.EMPLOYEE;
    model.cellphone = '999999999';
    model.email = 'machado@assis.com';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because all mandatory properties are filled in and some optional for this CASE 4', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.EMPLOYEE;
    model.cellphone = '999999999';
    model.email = 'machado@assis.com';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';
    model.complement = 'complement';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because all mandatory properties are fulfilled for this CASE 5', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.PROVIDER;
    model.cellphone = '999999999';
    model.email = 'machado@assis.com';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because all mandatory properties are filled in and some optional for this CASE 6', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.PROVIDER;
    model.cellphone = '999999999';
    model.email = 'machado@assis.com';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';
    model.complement = 'complement';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });
});

describe('Suite teste class validator IsRequiredWhen() CASE ERROR', () => {
  it('Should return error because some mandatory properties are NOT filled in and some are optional for this CASE 1', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.CANDIDATE;
    model.gender = 'male';
    model.cellphone = '999999999';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(1);
  });

  it('Should return error because some mandatory properties are NOT filled in and some are optional for this CASE 2', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.CANDIDATE;
    model.gender = 'male';
    model.cellphone = '999999999';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';
    model.complement = 'complement';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(1);
  });

  it('Should return error because some mandatory properties are NOT filled in and some are optional for this CASE 3', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.EMPLOYEE;
    model.cellphone = '999999999';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';
    model.complement = 'complement';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(1);
  });

  it('Should return error because some mandatory properties are NOT filled in and some are optional for this CASE 4', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.type = TypePersonEnum.PROVIDER;
    model.cellphone = '999999999';
    model.socialNetwork = 'https://www.linkedin.com/in/machadodeassis';
    model.complement = 'complement';

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(1);
  });
});
