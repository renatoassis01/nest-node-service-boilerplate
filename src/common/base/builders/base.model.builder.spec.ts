import { FakerUtils } from '../../utils/faker.utils';
import { BaseModel } from '../models/base.model';
import { BaseModelBuiler } from './base.model.builder';

class PersonModel extends BaseModel {
  id: string;
  name: string;
}

class PersonModelBuilder extends BaseModelBuiler<
  PersonModelBuilder,
  PersonModel
> {
  public withName(name: string): PersonModelBuilder {
    this.builder.name = name;
    return this;
  }
}

describe('Suite testes BaseModelBuilder', () => {
  const name = FakerUtils.faker().name.firstName();

  it('create instance entity with property default', () => {
    const personModel = new PersonModelBuilder()
      .withId()
      .withTenantId()
      .withUserId()
      .withCreateAt()
      .withUpdatedAt()
      .withDeletedAt()
      .withName(name)
      .build();

    expect(personModel.name).toEqual(name);
    expect(personModel.id).not.toBeUndefined();
    expect(personModel.tenantId).not.toBeUndefined();
    expect(personModel.userId).not.toBeUndefined();
    expect(personModel.createdAt).not.toBeUndefined();
    expect(personModel.updatedAt).not.toBeUndefined();
    expect(personModel.deletedAt).toBeNull();
  });
  it('create instance entity without property', () => {
    const userId = FakerUtils.faker().random.uuid();
    const personModel = new PersonModelBuilder()
      .withId()
      .withTenantId()
      .withUserId(userId)
      .withDeletedAt(new Date())
      .withName(name)
      .build();
    expect(personModel.name).toEqual(name);
    expect(personModel.id).not.toBeUndefined();
    expect(personModel.tenantId).not.toBeUndefined();
    expect(personModel.userId).toEqual(userId);
    expect(personModel).not.toContain('createdAt');
    expect(personModel).not.toContain('updatedAt');
    expect(personModel.deletedAt).not.toBeNull();
  });
});
