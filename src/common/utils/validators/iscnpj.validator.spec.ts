import { Validator } from 'class-validator';
import { IsCNPJ } from './iscnpj.validator';
import * as cnpj from '@fnando/cnpj';
const validator = new Validator();

class MyDTO {
  @IsCNPJ()
  cnpj: string;
}
describe('Suite teste class validator @IsCNPJ()', () => {
  it('Should true if for a valid and masked cnpj', () => {
    const model = new MyDTO();
    model.cnpj = cnpj.generate(true);
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should true if for a valid cnpj and without mask', () => {
    const model = new MyDTO();
    model.cnpj = cnpj.generate();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should false if for a invalid cnpj', () => {
    const model = new MyDTO();
    model.cnpj = '111333rfraaaaaaaaa';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
