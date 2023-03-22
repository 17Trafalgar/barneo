import { Module } from '@nestjs/common';
import { MappingService } from './mapping.service';

@Module({
  imports: [],
  providers: [MappingService],
  controllers: [],
  exports: [MappingService],
})
export class MappingModule {}
