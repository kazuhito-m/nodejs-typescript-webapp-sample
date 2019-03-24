
import { Logger, QueryRunner } from 'typeorm';
import * as Log4js from 'log4js/lib/log4js';

export default class Log4jsAdapterForTypeOrm implements Logger {
  private logger = Log4js.getLogger('TypeORM');

  constructor(
    private readonly options?:
      | boolean
      | 'all'
      | Array<
          'log' | 'info' | 'warn' | 'query' | 'schema' | 'error' | 'migration'
        >
      | undefined,
  ) {}

  public logQuery(
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('query') !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
          : '');
      this.logger.debug('query' + ': ' + sql);
    }
  }

  public logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('error') !== -1)
    ) {
      const p = parameters;
      const sql =
        query +
        (p && p.length ? ' -- PARAMETERS: ' + this.stringifyParams(p) : '');
      console.log('query failed: ' + sql);
      console.log('error:', error);
    }
  }

  public logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    const p = parameters;
    const sql =
      query +
      (p && p.length ? ' -- PARAMETERS: ' + this.stringifyParams(p) : '');
    this.logger.debug('query is slow: ' + sql);
    this.logger.debug('execution time: ' + time);
  }

  public logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (
      this.options === 'all' ||
      (this.options instanceof Array && this.options.indexOf('schema') !== -1)
    ) {
      this.logger.debug(message);
    }
  }

  public logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  public log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ) {
    const o = this.options;
    switch (level) {
      case 'log':
        if (o === 'all' || (o instanceof Array && o.indexOf('log') !== -1))
          this.logger.debug(message);
        break;
      case 'info':
        if (o === 'all' || (o instanceof Array && o.indexOf('info') !== -1))
          this.logger.info(message);
        break;
      case 'warn':
        if (o === 'all' || (o instanceof Array && o.indexOf('warn') !== -1))
          this.logger.warn(message);
        break;
    }
  }

  private stringifyParams(parameters: any): string {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      return parameters;
    }
  }
}
