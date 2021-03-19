import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormatReponseUtils } from '../utils/formatresponse.utils';
import { DataResponse } from '../interfaces/data.response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, DataResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DataResponse<T>> {
    return next
      .handle()
      .pipe(map((data) => FormatReponseUtils.format<T>(data)));
  }
}
