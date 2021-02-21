import { FakerUtils } from './faker.utils';

describe('Suite tests FakerUtils', () => {
  it('SMOKE test', () => {
    expect(FakerUtils.faker).toBeDefined();
    expect(FakerUtils.brazillianCulture().random.cnpj()).toBeDefined();
    expect(FakerUtils.brazillianCulture().random.cpf()).toBeDefined();
  });
});
