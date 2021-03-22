import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityRepository, getConnection } from 'typeorm';
import { getDatabaseConfigConnectionQA } from '../../../config/database/connection';
import { DEFAULT_PAGINATION_SIZE } from '../../constants/constants';
import { SortOrderEnum } from '../../enums/sortorder.enum';
import { FakerUtils } from '../../utils/faker.utils';
import { BaseRepository } from './base.repository';
import { BuilderTodoModel } from './builders/todo.builder';
import { TodoModel } from './models/todo.model';

@EntityRepository(TodoModel)
class TodoRepository extends BaseRepository<TodoModel> {}

const todo1 = new BuilderTodoModel()
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

async function createManyTodos(
  todoRepository: TodoRepository,
  tenantId: string,
  totalTodos: number,
): Promise<any[]> {
  const todos = [];
  const userId = FakerUtils.faker().random.uuid();
  for (let index = 1; index < totalTodos + 1; index++) {
    const created = await todoRepository.store(tenantId, userId, {
      name: `todo ${index}`,
      done: false,
    });
    todos.push(created);
  }
  return todos;
}

describe('Suite test BaseRepository', () => {
  let todoRepository: TodoRepository;

  beforeEach(async () => {
    const databaseOptions = getDatabaseConfigConnectionQA();
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseOptions,
          entities: [TodoModel],
        }),
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
      const result = await todoRepository.store(
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
      const created = await todoRepository.store(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      const todo = await todoRepository.getById(created.tenantId, created.id);
      expect(todo.id).toEqual(created.id);
    });
    it('entity not found', async () => {
      const created = await todoRepository.store(
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
      const created = await todoRepository.store(
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
  describe('Suite test [removeById]', () => {
    it('must return true entities removed', async () => {
      const result = await todoRepository.store(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      await todoRepository.disableById(
        result.tenantId,
        result.id,
        result.userId,
      );
      const data = await todoRepository.getById(result.tenantId, result.id);
      expect(data).toBeUndefined();
    });
    it('must return false entities not removed', async () => {
      const result = await todoRepository.store(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      const isDeleted = await todoRepository.disableById(
        result.tenantId,
        FakerUtils.faker().random.uuid(),
        result.userId,
      );
      expect(isDeleted).toBe(false);
    });
  });

  describe('Suite test [deleteById]', () => {
    it('must return true entities deleteds', async () => {
      const result = await todoRepository.store(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      await todoRepository.deleteById(result.tenantId, result.id);
      const data = await todoRepository.getById(result.tenantId, result.id);
      expect(data).toBeUndefined();
    });
    it('must return false entities not deleteds', async () => {
      const result = await todoRepository.store(
        todo1.tenantId,
        todo1.userId,
        todo1DTO,
      );
      const isDeleted = await todoRepository.deleteById(
        result.tenantId,
        FakerUtils.faker().random.uuid(),
      );
      expect(isDeleted).toBe(false);
    });
  });

  describe('Suite tests [getAll]', () => {
    it('tests paginator', async () => {
      const totalTodos = 6;
      const tenantId = FakerUtils.faker().random.uuid();
      await createManyTodos(todoRepository, tenantId, totalTodos);
      const result = await todoRepository.getByFilters(tenantId, {
        page: 1,
        size: totalTodos / 2,
      });
      expect(result.count).toBe(totalTodos);
      expect(result.limit).toBe(totalTodos / 2);
      expect(result.totalPages).toBe(2);
      expect(result.page).toBe(1);
    });

    it('must return the number of all inserted', async () => {
      const totalTodos = 3;
      const tenantId = FakerUtils.faker().random.uuid();
      await createManyTodos(todoRepository, tenantId, totalTodos);
      const result = await todoRepository.getByFilters(tenantId);
      expect(result.count).toBe(totalTodos);
      expect(result.limit).toBe(DEFAULT_PAGINATION_SIZE);
      expect(result.totalPages).toBe(1);
      expect(result.page).toBe(1);
    });
    it('must return all entities according to the field searched', async () => {
      const totalTodos = 3;
      const tenantId = FakerUtils.faker().random.uuid();
      const todos = await createManyTodos(todoRepository, tenantId, totalTodos);
      const first = todos[0];
      const result = await todoRepository.getByFilters(tenantId, {
        name: first.name,
      });
      expect(result.data[0].name).toBe(first.name);
    });
    it('must return ordered entities', async () => {
      const totalTodos = 6;
      const tenantId = FakerUtils.faker().random.uuid();
      const todos = await createManyTodos(todoRepository, tenantId, totalTodos);
      const last = todos[totalTodos - 1];
      const result = await todoRepository.getByFilters(tenantId, {
        sortOrder: SortOrderEnum.DESC,
        sortParam: 'name',
      });
      expect(result.data[0].name).toBe(last.name);
    });
    it('must return entities deleteds', async () => {
      const totalTodos = 6;
      const tenantId = FakerUtils.faker().random.uuid();
      const todos = await createManyTodos(todoRepository, tenantId, totalTodos);
      const todo: TodoModel = todos[2];

      const result = await todoRepository.getByFilters(tenantId);

      await todoRepository.disableById(tenantId, todo.id, todo.userId);
      const resultWithDelteds = await todoRepository.getByFilters(tenantId, {
        withDeleted: false,
      });
      expect(result.data.length).toBe(totalTodos);
      expect(resultWithDelteds.data.length).toBe(totalTodos - 1);
    });
  });
});
