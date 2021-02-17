import { BaseGetAllRequestDTO } from '../base/dtos/request/base.getall.dto';

export type GetAllFilterPartialType<
  T extends BaseGetAllRequestDTO
> = Partial<T>;
