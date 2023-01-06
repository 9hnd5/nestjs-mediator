<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Motivation
[NestJS](https://github.com/nestjs/nest) has a lightweight **CQRS** module that works very well but the problem is we can not inject the other provider with **scope-request** and that is the reason why this package has existed
## Description

The **nestjs-mediator** supports request/response, command, query, and notification with exposing the ability to inject any **scope-request** provider


## Installation

```bash
$ npm install --save nestjs-mediator
```
or with yarn
```bash
$ yarn add nestjs-mediator
```

## Quick Start(or reference in src/example)
### Request/Response
Define your query or command
```javascript
import { Request } from "nestjs-mediator"
class TestCommand extends Request<string>{
	//Your properties
}
```
Then define your handler

```javascript
import { RequestHandler, IRequestHandler } from "nestjs-mediator"

@RequestHandler(TestCommand)
class TestCommandHandler implements IRequestHandler<TestCommand, string> {
	handle(data: TestCommand): Promise<string>{
		//Your logic
	}
}
```
Don't forget to import your CommandHandler and MediatorModule into your module
```javascript
import { MediatorModule } from "nestjs-mediator"

@Module({
	imports: [MediatorModule],
	providers: [TestCommandHandler]
})
class TestModule{}
```
Finally, send your command through the mediator:
```javascript
@Controller()
class TestController {
	constructor(private mediator: Mediator){}
	
	@Post()
	post(){
		return this.mediator.send(new TestCommand());
	}
}
```
### Notification
Define your notification
```javascript
import { Notification } from "nestjs-mediator"
class TestNotification extends Notification{
	//Your properties
}
```
and then define many handlers that you want to receive this notification
```javascript
import { NotificationHandler, INotificationHandler } from "nestjs-mediator"

@NotificationHandler(TestNotification)
class TestNotificationHandler1 implements INotificationHandler<TestNotification>{
	handle(data: TestNotification){
		//Your logic
	}
}
@NotificationHandler(TestNotification)
class TestNotificationHandler2 implements INotificationHandler<TestNotification>{
	handle(data: TestNotification){
		//Your logic
	}
}
```

Import MediatorModule and your handler the same as above and finally, publish your message via the mediator
```javascript
@Controller()
class TestController {
	constructor(private mediator: Mediator){}
	
	@Post()
	post(){
		this.mediator.publish(new TestNotification())
	}
}
```
### Types

`Request<T>` - where T is the returns value

`RequestHandler<T> `- the decorator where T is your request

`IRequestHandler<T, U>` - you must implement this interface, T is your request and U is your return value

`Notification`

`NotificationHandler<T>` - the decorator where T is your notification

`INotificationHandler<T>` - the interface that you have to implement to publish your notification



