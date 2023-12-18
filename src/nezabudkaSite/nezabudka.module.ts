import { Module } from '@nestjs/common';
import { NezabudkaService } from './nezabudka.service';
import { NezabudkaController } from './nezabudka.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NezabudkaService],
  controllers: [NezabudkaController],
  exports: [NezabudkaService],
})
export class NezabudkaModule {}
