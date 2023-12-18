import { Module } from '@nestjs/common';
import { MappingService } from '../mapping/mapping.service';

@Module({
  providers: [MappingService],
  exports: [MappingService],
})
export class MappingModule {}
