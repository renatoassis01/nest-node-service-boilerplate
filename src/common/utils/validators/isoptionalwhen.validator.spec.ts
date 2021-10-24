import { IsNotEmpty, IsNumber, IsOptional, Validator } from 'class-validator';
import { IsOptionalWhen } from './isoptionalwhen.validator';

const validator = new Validator();

describe('Suite teste class validator IsOptionalWhen()', () => {
  class PersonRequestDTO {
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsOptional()
    legalPerson: boolean;

    @IsOptionalWhen<PersonRequestDTO>('legalPerson', false)
    documentNumber?: string;
  }

  it('should NOT return an error because the property is optional for this CASE 1', async () => {
    const model = new PersonRequestDTO();
    model.legalPerson = false;
    model.name = 'Machando de Assis';
    model.age = 69;
    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because the property is optional, but has been FULFILLED for this CASE 2', async () => {
    const model = new PersonRequestDTO();
    model.legalPerson = false;
    model.name = 'Machando de Assis';
    model.documentNumber = '44.975.402/0001-87';
    model.age = 69;
    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because the property is optional, but has been FULFILLED for this CASE 3', async () => {
    const model = new PersonRequestDTO();
    model.name = 'Machando de Assis';
    model.documentNumber = '44.975.402/0001-87';
    model.age = 69;

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because the property is REQUIRED, but has been FULFILLED for this CASE 4', async () => {
    const model = new PersonRequestDTO();
    model.legalPerson = true;
    model.name = 'Machando de Assis';
    model.documentNumber = '44.975.402/0001-87';
    model.age = 69;

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('SHOULD return an error because the property is REQUIRED but has NOT been FULFILLED for this CASE 5', async () => {
    const model = new PersonRequestDTO();
    model.legalPerson = true;
    model.name = 'Machando de Assis';
    model.age = 69;

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(1);
  });
});

describe('Suite teste class validator IsOptionalWhen() with multiples values', () => {
  class PersonRequestDTO {
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsNotEmpty()
    docType: string;

    @IsOptionalWhen<PersonRequestDTO>('docType', ['cpf', 'rg'])
    documentNumber?: string;
  }

  it('should NOT return an error because the property is optional for this CASE 1', async () => {
    const model = new PersonRequestDTO();
    model.docType = 'cpf';
    model.name = 'Machando de Assis';
    model.age = 69;
    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('should NOT return an error because the property is optional for this CASE 2', async () => {
    const model = new PersonRequestDTO();
    model.docType = 'rg';
    model.name = 'Machando de Assis';
    model.age = 69;
    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because the property is optional, but has been FULFILLED for this CASE 3', async () => {
    const model = new PersonRequestDTO();
    model.docType = 'cpf';
    model.name = 'Machando de Assis';
    model.documentNumber = '615.105.520-90';
    model.age = 69;
    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because the property is optional, but has been FULFILLED for this CASE 4', async () => {
    const model = new PersonRequestDTO();
    model.docType = 'rg';
    model.name = 'Machando de Assis';
    model.documentNumber = '15.963.297-3';
    model.age = 69;
    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('Should NOT return an error because the property is REQUIRED, but has been FULFILLED for this CASE 5', async () => {
    const model = new PersonRequestDTO();
    model.docType = 'cnpj';
    model.name = 'Machando de Assis';
    model.documentNumber = '44.975.402/0001-87';
    model.age = 69;

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(0);
  });

  it('SHOULD return an error because the property is REQUIRED but has NOT been FULFILLED for this CASE 6', async () => {
    const model = new PersonRequestDTO();
    model.docType = 'cnpj';
    model.name = 'Machando de Assis';
    model.age = 69;

    const errors = await validator.validate(model);
    expect(errors.length).toEqual(1);
  });
});
