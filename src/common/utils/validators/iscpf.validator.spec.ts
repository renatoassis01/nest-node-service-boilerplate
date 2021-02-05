import { Validator } from 'class-validator';
import * as cpf from '@fnando/cpf';
import { IsCPF } from './iscpf.validator';
const validator = new Validator();

class MyDTO {
  @IsCPF()
  cpf: string;
}
describe('Suite teste class validator @IsCPF()', () => {
  it('Should true if for a valid and masked cpf', () => {
    const model = new MyDTO();
    model.cpf = cpf.generate(true);
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should true if for a valid cpf and without mask', () => {
    const model = new MyDTO();
    model.cpf = cpf.generate();
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(0);
    });
  });

  it('Should false if for a invalid cpf', () => {
    const model = new MyDTO();
    model.cpf = '111333rfraaaaaaaaa';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
