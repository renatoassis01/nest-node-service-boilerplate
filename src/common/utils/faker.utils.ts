import * as faker from 'faker';
faker.setLocale('pt_BR');
export class FakerUtils {
  public static faker(): Faker.FakerStatic {
    return faker;
  }
}
