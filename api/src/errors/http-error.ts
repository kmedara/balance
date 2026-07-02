import type { FastifyError, FastifyInstance, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
};

/**
 * Base class for errors that map to an RFC 9457 (Problem Details) HTTP
 * response. Throw a subclass from anywhere in the request lifecycle and the
 * global error handler will serialize it as `application/problem+json`.
 */
export abstract class AppError extends Error {
  abstract readonly status: number;
  abstract readonly title: string;
  readonly type: string = 'about:blank';

  constructor(detail?: string) {
    super(detail);
    this.name = new.target.name;
  }

  get detail(): string | undefined {
    return this.message || undefined;
  }

  toProblem(instance?: string): ProblemDetails {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      ...(this.detail ? { detail: this.detail } : {}),
      ...(instance ? { instance } : {}),
    };
  }
}

export class BadRequestError extends AppError {
  readonly status = 400;
  readonly title = 'Bad Request';
  readonly type = '/problems/bad-request';
}

export class UnauthorizedError extends AppError {
  readonly status = 401;
  readonly title = 'Unauthorized';
  readonly type = '/problems/unauthorized';
}

export class ForbiddenError extends AppError {
  readonly status = 403;
  readonly title = 'Forbidden';
  readonly type = '/problems/forbidden';

  constructor(detail = 'Forbidden') {
    super(detail);
  }
}

export class NotFoundError extends AppError {
  readonly status = 404;
  readonly title = 'Not Found';
  readonly type = '/problems/not-found';
}

export class ConflictError extends AppError {
  readonly status = 409;
  readonly title = 'Conflict';
  readonly type = '/problems/conflict';
}

export class BadGatewayError extends AppError {
  readonly status = 502;
  readonly title = 'Bad Gateway';
  readonly type = '/problems/bad-gateway';
}

export class ServiceUnavailableError extends AppError {
  readonly status = 503;
  readonly title = 'Service Unavailable';
  readonly type = '/problems/service-unavailable';
}

const PROBLEM_CONTENT_TYPE = 'application/problem+json';

const sendProblem = (reply: FastifyReply, problem: ProblemDetails): FastifyReply =>
  reply.status(problem.status).type(PROBLEM_CONTENT_TYPE).send(problem);

const errorHandlingPlugin = async (app: FastifyInstance): Promise<void> => {
  app.setNotFoundHandler((request, reply) => {
    sendProblem(reply, {
      type: '/problems/not-found',
      title: 'Not Found',
      status: 404,
      detail: `Route ${request.method} ${request.url} not found`,
      instance: request.url,
    });
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return sendProblem(reply, error.toProblem(request.url));
    }

    const fastifyError = error as FastifyError;
    const { validation, validationContext } = fastifyError;
    if (validation) {
      const scope = validationContext ?? 'request';
      const detail = validation
        .map((entry) => `${scope}${entry.instancePath} ${entry.message ?? 'is invalid'}`.trim())
        .join('; ');

      return sendProblem(reply, {
        type: '/problems/bad-request',
        title: 'Bad Request',
        status: 400,
        detail: detail || 'Request validation failed',
        instance: request.url,
      });
    }

    const statusCode = fastifyError.statusCode;
    if (typeof statusCode === 'number' && statusCode >= 400 && statusCode < 500) {
      return sendProblem(reply, {
        type: 'about:blank',
        title: fastifyError.name || 'Error',
        status: statusCode,
        ...(fastifyError.message ? { detail: fastifyError.message } : {}),
        instance: request.url,
      });
    }

    request.log.error({ err: error }, 'Unhandled error');
    return sendProblem(reply, {
      type: 'about:blank',
      title: 'Internal Server Error',
      status: 500,
      ...(process.env.NODE_ENV === 'production' ? {} : { detail: fastifyError.message }),
      instance: request.url,
    });
  });
};

export const registerErrorHandling = fp(errorHandlingPlugin, { name: 'balance-errors' });
