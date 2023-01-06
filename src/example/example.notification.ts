import { NotificationHandler } from "src/lib/mediator.decorator";
import { INotificationHandler, Notification } from "src/lib/mediator.service";

export class ExampleNotification extends Notification {}

@NotificationHandler(ExampleNotification)
export class ExampleNotificationHandler1 implements INotificationHandler<ExampleNotification> {
  handle(data: ExampleNotification) {
    console.log('data1', data);
  }
}

@NotificationHandler(ExampleNotification)
export class ExampleNotificationHandler2 implements INotificationHandler<ExampleNotification> {
  handle(data: ExampleNotification) {
    console.log('data2', data);
  }
}
