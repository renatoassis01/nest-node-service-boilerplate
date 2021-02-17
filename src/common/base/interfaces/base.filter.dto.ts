import { IBaseOrderByDTO } from './base.orderby.dto';
import { IBasePaginationDTO } from './base.pagination.dto';

export interface IBaseFilter extends IBaseOrderByDTO, IBasePaginationDTO {
  withDeleted?: boolean;
  withRelations?: boolean;
}
