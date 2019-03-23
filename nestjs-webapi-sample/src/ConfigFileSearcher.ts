import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Path from 'path';
import * as fs from 'fs';
import SystemConfig from './domain/model/SystemConfig';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default class ConfigFileSearcher {
  private static CONFIG_PREFIX = 'systemconfig';

  private config: SystemConfig;

  public search() {
    const fileName = ConfigFileSearcher.CONFIG_PREFIX + '.json';
    const existsFilePath = this.searchFile(fileName);
    console.log(existsFilePath);
    const json = JSON.parse(fs.readFileSync(existsFilePath, 'utf8'));
    this.config = json as SystemConfig;
  }

  public databaseSettings(
    profile: string,
    entities: any[],
  ): PostgresConnectionOptions {
    const dbSettings = this.config[profile];
    dbSettings.name = profile;
    dbSettings.entities = entities;
    return dbSettings as PostgresConnectionOptions;
  }

  private searchFile(configFileName: string): string {
    const nearPath = Path.join(process.cwd(), configFileName);
    if (this.existsFile(nearPath)) return nearPath;
    const scriptDir = Path.dirname(process.argv[1]);
    const scriptNearPath = Path.join(scriptDir, configFileName);
    if (this.existsFile(scriptNearPath)) return scriptNearPath;
    throw Error('設定ファイルが見つかりません。');
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
