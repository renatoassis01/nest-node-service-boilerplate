import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { TransformUtils } from '../../../../common/utils/transform.utils';

export class GetBookRequestDTO {
  @ApiPropertyOptional({
    description: 'Records deleteds',
    type: Boolean,
  })
  @Transform((obj) => TransformUtils.ToBoolean(obj))
  @IsOptional()
  @IsBoolean()
  withDeleted?: boolean;
}
