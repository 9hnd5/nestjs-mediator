import { NotificationHandler, INotificationHandler, Notification } from 'nestjs-mediator';

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
