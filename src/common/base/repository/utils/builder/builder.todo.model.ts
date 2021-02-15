import { FakerUtils } from '../../../../utils/faker.utils';
import { BaseModelBuiler } from '../../../builders/base.model.builder';
import { TodoModel } from '../model/todo.model';

export class BuilerTodoModel extends BaseModelBuiler<
  BuilerTodoModel,
  TodoModel
> {
  withName(): BuilerTodoModel {
    this.builder.name = FakerUtils.faker().random.words(2);
    return this;
  }

  withDone(completed?: boolean): BuilerTodoModel {
    this.builder.done = completed ? completed : false;
    return this;
  }
}
