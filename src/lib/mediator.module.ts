import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TransformPipe } from 'src/lib/mediator.pipe';
import { Mediator } from './mediator.service';

@Module({
  providers: [
    Mediator,
    {
      provide: APP_PIPE,
      useClass: TransformPipe,
    },
  ],
  exports: [Mediator],
})
export class MediatorModule {}
