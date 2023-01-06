import { Body, Controller, Post } from '@nestjs/common';
import { ExampleCommand } from 'example/example.command';
import { ExampleNotification } from 'example/example.notification';
import { Mediator } from 'nestjs-mediator';

@Controller('example')
export class ExampleController {
  constructor(private mediator: Mediator) {}

  @Post()
  command(@Body() command: ExampleCommand) {
    return this.mediator.send(command);
  }

  @Post('notification')
  notification(@Body() noti: ExampleNotification) {
    return this.mediator.publish(noti);
  }
}
