import { AbstractRepository } from 'typeorm';
export class BaseRepository<T> extends AbstractRepository<T> {
  public async findById(id: number): Promise<T> {
    return this.repository.findOne(id);
  }
}
