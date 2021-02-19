import { FakerUtils } from '../../../utils/faker.utils';
import { BaseBuilder } from '../../builders/base.builder';
import { TodoModel } from '../models/todo.model';

export class BuilderTodoModel extends BaseBuilder<BuilderTodoModel, TodoModel> {
  withName(): BuilderTodoModel {
    this.builder.name = FakerUtils.faker().random.words(2);
    return this;
  }

  withDone(completed?: boolean): BuilderTodoModel {
    this.builder.done = completed ? completed : false;
    return this;
  }
}
