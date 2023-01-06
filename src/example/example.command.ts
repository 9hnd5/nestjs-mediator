import { RequestHandler } from "src/lib/mediator.decorator";
import { IRequestHandler, Request } from "src/lib/mediator.service";

export class ExampleCommand extends Request<string> {
  id: string;
}
@RequestHandler(ExampleCommand)
export class ExampleCommandHandler implements IRequestHandler<ExampleCommand, string> {
  handle(data: ExampleCommand): Promise<string> {
    return Promise.resolve(data.id);
  }
}
