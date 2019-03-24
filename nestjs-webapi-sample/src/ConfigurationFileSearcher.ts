import * as Path from 'path';
import * as fs from 'fs';
import * as Log4js from 'log4js/lib/log4js';
import SystemConfig from './domain/model/SystemConfig';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Log4jsAdapterForTypeOrm from './Log4jsAdapterForTypeOrm';

export default class ConfigurationFileSearcher {
  private static CONFIG_PREFIX = 'systemconfig';
  private static DEFAULT_CONNECTION_NAME = 'sampleDb';

  private logger = Log4js.getLogger();

  private config: SystemConfig;

  public search(): void {
    this.searchLog4js();
    this.searchSystemConfig();
  }

  public databaseSettings(
    connectionName: string,
    entities: any[],
  ): PostgresConnectionOptions {
    const dbSettings = this.config[connectionName];
    if (connectionName !== ConfigurationFileSearcher.DEFAULT_CONNECTION_NAME)
      dbSettings.name = connectionName;
    dbSettings.entities = entities;
    dbSettings.logger = new Log4jsAdapterForTypeOrm(dbSettings.logging);
    return dbSettings as PostgresConnectionOptions;
  }

  private searchSystemConfig(): void {
    const fileName = ConfigurationFileSearcher.CONFIG_PREFIX + '.json';
    const existsFilePath = this.searchFile(fileName);
    const json = JSON.parse(fs.readFileSync(existsFilePath, 'utf8'));
    this.config = json as SystemConfig;
    this.logger.info(existsFilePath + ' find System Configure.');
  }

  private searchLog4js() {
    const logConfigFilePath = this.searchFile('log4js.json');
    if (logConfigFilePath === '') return;
    Log4js.configure(logConfigFilePath);
    this.logger.info(logConfigFilePath + ' loaded...');
  }

  private searchFile(configFileName: string): string {
    const nearPath = Path.join(process.cwd(), configFileName);
    if (this.existsFile(nearPath)) return nearPath;
    const scriptDir = Path.dirname(process.argv[1]);
    const scriptNearPath = Path.join(scriptDir, configFileName);
    if (this.existsFile(scriptNearPath)) return scriptNearPath;

    const errorMessage = '設定ファイルが見つかりません。:' + configFileName;
    this.logger.error(errorMessage);
    throw Error(errorMessage);
  }

  private existsFile(path: string): boolean {
    try {
      fs.access(path, err => {
        if (err) console.log(err);
      });
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') return false;
      throw err;
    }
  }
}
