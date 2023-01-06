import { Body, Controller, Post } from '@nestjs/common';
import { ExampleCommand } from 'src/example/example.command';
import { ExampleNotification } from 'src/example/example.notification';
import { Mediator } from 'src/lib/mediator.service';

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
