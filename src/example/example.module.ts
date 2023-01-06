import { Module } from '@nestjs/common';
import { ExampleCommandHandler } from 'src/example/example.command';
import { ExampleController } from 'src/example/example.controller';
import { ExampleNotificationHandler1, ExampleNotificationHandler2 } from 'src/example/example.notification';
import { MediatorModule } from 'src/lib/mediator.module';

@Module({
  imports: [MediatorModule],
  controllers: [ExampleController],
  providers: [ExampleCommandHandler, ExampleNotificationHandler1, ExampleNotificationHandler2],
})
export class ExampleModule {}
