import 'reflect-metadata';
import { Notification, INotificationHandler, Request, IRequestHandler } from './mediator.service';

export function RequestHandler<TRequest extends { new (...args: any[]): Request }>(request: TRequest) {
  return function <TRequestHandler extends { new (...args: any[]): IRequestHandler<Request> }>(
    requestHandler: TRequestHandler,
  ) {
    if (Reflect.hasMetadata(request.name, request)) {
      throw new Error(
        `Multiple request handlers registered for ${request.name}. Only one request handler can be registered per request.`,
      );
    }

    Reflect.defineMetadata(request.name, requestHandler, request);
  };
}

export function NotificationHandler<TNotification extends { new (...args: any[]): Notification }>(
  notification: TNotification,
) {
  return function <
    TNotificationHandler extends {
      new (...args: any[]): INotificationHandler<Notification>;
    },
  >(notificationHandler: TNotificationHandler) {
    const metadataKey = notification.name;
    const target = notification;
    let metadataValue = Reflect.getMetadata(metadataKey, target) ?? [];
    metadataValue.push(notificationHandler);
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  };
}
