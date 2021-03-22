import { DeepPartial } from 'typeorm';
import { IBaseFilter } from '../base/interfaces/base.filter.dto';

export type FilterRequestDTO<T> = IBaseFilter &
  DeepPartial<T> &
  Record<symbol, unknown>;
