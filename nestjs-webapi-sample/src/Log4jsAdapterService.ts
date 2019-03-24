import { LoggerService } from '@nestjs/common';
// import * as Log4js from 'log4js';
import * as Log4js from '../node_modules/log4js/lib/log4js';

/**
 * Nest.jsの出すLogを、Log4jsに流すためのアダプタ。
 */
export default class Log4jsAdapterService implements LoggerService {
  private logger = Log4js.getLogger('NestJS');

  log(message: string, context?: string): void {
    this.logger.info(message);
  }
  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace);
  }
  warn(message: string, context?: string): void {
    this.logger.warn(message);
  }
}
