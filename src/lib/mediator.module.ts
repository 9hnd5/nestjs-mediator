import { Module } from '@nestjs/common';
import { Mediator } from './mediator.service';

@Module({
  providers: [Mediator],
  exports: [Mediator],
})
export class MediatorModule {}
