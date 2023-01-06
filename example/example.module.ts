import { Module } from '@nestjs/common';
import { ExampleCommandHandler } from 'example/example.command';
import { ExampleController } from 'example/example.controller';
import { ExampleNotificationHandler1, ExampleNotificationHandler2 } from 'example/example.notification';
import { MediatorModule } from 'nestjs-mediator';

@Module({
  imports: [MediatorModule],
  controllers: [ExampleController],
  providers: [ExampleCommandHandler, ExampleNotificationHandler1, ExampleNotificationHandler2],
})
export class ExampleModule {}
