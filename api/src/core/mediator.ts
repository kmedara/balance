export type RequestHandler<TRequest, TResponse> = (
  request: TRequest,
) => Promise<TResponse>;

export type EventHandler<TEvent> = (event: TEvent) => Promise<void>;

export class Mediator {
  private readonly requestHandlers = new Map<string, RequestHandler<unknown, unknown>>();
  private readonly eventHandlers = new Map<string, EventHandler<unknown>[]>();

  registerRequest<TRequest, TResponse>(
    key: string,
    handler: RequestHandler<TRequest, TResponse>,
  ): void {
    this.requestHandlers.set(key, handler as RequestHandler<unknown, unknown>);
  }

  async send<TRequest, TResponse>(key: string, request: TRequest): Promise<TResponse> {
    const handler = this.requestHandlers.get(key);
    if (!handler) {
      throw new Error(`No request handler registered for key: ${key}`);
    }
    return (await handler(request)) as TResponse;
  }

  subscribe<TEvent>(eventName: string, handler: EventHandler<TEvent>): void {
    const handlers = this.eventHandlers.get(eventName) ?? [];
    handlers.push(handler as EventHandler<unknown>);
    this.eventHandlers.set(eventName, handlers);
  }

  async publish<TEvent>(eventName: string, event: TEvent): Promise<void> {
    const handlers = this.eventHandlers.get(eventName) ?? [];
    await Promise.all(handlers.map((handler) => handler(event)));
  }
}
