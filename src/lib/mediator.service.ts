import { Inject, Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import 'reflect-metadata';

export abstract class Request<T = any> {
  private dumb: T;
}

export interface IRequestHandler<TRequest extends Request, TResponse = any> {
  handle(data: TRequest): Promise<TResponse>;
}

export abstract class Notification {
  private dumb: 'dumb';
}

export interface INotificationHandler<TNotification extends Notification> {
  handle(data: TNotification): any;
}

@Injectable()
export class Mediator {
  constructor(private moduleRef: ModuleRef, @Inject(REQUEST) private request: any) {}

  async send<TRequest extends Request, R = TRequest extends Request<infer X> ? X : unknown>(data: TRequest): Promise<R> {
    //data is instance and handler is Class type(constructor)
    const handler = Reflect.getMetadata(data.constructor.name, data.constructor);

    if (!handler) {
      throw new Error(`No request handler registered for ${data.constructor.name}`);
    }

    const contextId = ContextIdFactory.getByRequest(this.request);

    const resolveHandler = await this.moduleRef.resolve(handler, contextId, { strict: false });
    if ('handle' in resolveHandler) {
      return resolveHandler.handle(data);
    }

    throw new Error(`Please implement ${handler.name} with IRequestHandler`);
  }

  async publish<TNotification extends Notification>(data: TNotification) {
    const handlers =
      (Reflect.getMetadata(data.constructor.name, data.constructor) as Array<{
        new (...args: any[]): INotificationHandler<TNotification>;
      }>) ?? [];
    if (handlers.length === 0) {
      throw new Error(`No notification handler registerd for ${data.constructor.name}`);
    }

    const contextId = ContextIdFactory.getByRequest(this.request);

    for (const handler of handlers) {
      const resolveHandler = (await this.moduleRef.resolve(handler, contextId, {
        strict: false,
      })) as INotificationHandler<TNotification>;
      if ('handle' in resolveHandler) {
        resolveHandler.handle(data);
      } else {
        throw new Error(`Please implement ${handler.name} with INotificationHandler`);
      }
    }
  }
}
