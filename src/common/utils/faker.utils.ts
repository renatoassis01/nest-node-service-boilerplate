import * as faker from 'faker';
import * as cnpjUtils from '@fnando/cnpj';
import * as cpfUtils from '@fnando/cpf';
faker.setLocale('pt_BR');

const local = {
  random: {
    cnpj: (withMask = false) =>
      withMask ? cnpjUtils.generate(true) : cnpjUtils.generate(),
    cpf: (withMask = false) =>
      withMask ? cpfUtils.generate(true) : cpfUtils.generate(),
  },
};

export class FakerUtils {
  public static faker(): Faker.FakerStatic {
    return faker;
  }

  public static brazillianCulture() {
    return local;
  }
}
