import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityRepository, getConnection } from 'typeorm';
import { getDatabaseConfigConnectionTest } from '../../../config/database/connection';
import { FakerUtils } from '../../utils/faker.utils';
import { BaseRepository } from './base.repository';
import { BuilerTodoModel } from './utils/builder/builder.todo.model';
import { TodoModel } from './utils/model/todo.model';

@EntityRepository(TodoModel)
class TodoRepository extends BaseRepository<TodoModel> {}

const todo1 = new BuilerTodoModel()
  .withCreateAt()
  .withDeletedAt()
  .withUpdatedAt()
  .withUserId()
  .withTenantId()
  .withName()
  .withDone()
  .build();

const todo1DTO = {
  name: todo1.name,
  done: todo1.done,
};

describe('Suite test BaseRepository', () => {
  let todoRepository: TodoRepository;

  beforeEach(async () => {
    const databaseOptions = getDatabaseConfigConnectionTest();
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseOptions, entities: [TodoModel] }),
        TypeOrmModule.forFeature([TodoRepository]),
      ],
      providers: [TodoRepository],
    }).compile();
    todoRepository = moduleRef.get<TodoRepository>(TodoRepository); //or getCustomRepository(TodoRepository);
  });

  afterEach(async () => {
    await getConnection().close();
    jest.resetAllMocks();
  });

  describe('Suite tests [create]', () => {
    it('should be create a entity', async () => {
      const result = await todoRepository.create(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      expect(result.id).not.toBeUndefined();
      expect(result.userId).toEqual(todo1.userId);
      expect(result.tenantId).toEqual(todo1.tenantId);
    });
  });

  describe('Suite tests [getById]', () => {
    it('should be return a entity', async () => {
      const created = await todoRepository.create(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      const todo = await todoRepository.getById(created.tenantId, created.id);
      expect(todo.id).toEqual(created.id);
    });
    it('entity not found', async () => {
      const created = await todoRepository.create(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      const todo = await todoRepository.getById(
        created.tenantId,
        FakerUtils.faker().random.uuid(),
      );
      expect(todo).toBeUndefined();
    });
  });

  describe('Suite tests [updateById]', () => {
    it('should be updated a entity', async () => {
      const otherUserId = FakerUtils.faker().random.uuid();
      const created = await todoRepository.create(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      await todoRepository.updateById(
        created.tenantId,
        otherUserId,
        created.id,
        {
          name: FakerUtils.faker().random.words(2),
          done: true,
        },
      );

      const updated = await todoRepository.getById(
        created.tenantId,
        created.id,
      );

      expect(created.name).not.toEqual(updated.name);
      expect(updated.userId).toEqual(otherUserId);
      expect(updated.done).toEqual(true);
    });
  });
});
