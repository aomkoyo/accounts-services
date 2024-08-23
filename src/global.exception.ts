import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        let httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const http = host.switchToHttp();
        const message = exception.message || null;
        const error = message && message.startsWith('Timeout') ? 'Gateway Timeout!' : exception.message || 'Internal server error';
        const status = message && message.startsWith('Timeout') ? 504 : httpStatus;
        const errorResponse = {
            code: status,
            timestamp: new Date().getTime(),
            message: error,
            data: null,
        };
        httpAdapter.reply(http.getResponse(), errorResponse, status);
    }
}
