import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Path from 'path';
import * as fs from 'fs';

export default class SearchOrmConfigFile {
  public find(targetClassses: any, profile?: string): TypeOrmModuleOptions {
    const sufix = profile ? '-' + profile : '';
    const fileName = 'ormconfig' + sufix + '.json';
    const existsFilePath = this.searchFile(fileName);
    if (existsFilePath === '') return undefined;
    console.log(existsFilePath);
    const json = JSON.parse(fs.readFileSync(existsFilePath, 'utf8'));
    json.entities = targetClassses;
    return json as TypeOrmModuleOptions;
  }

  private searchFile(configFileName: string): string {
    const nearPath = Path.join(process.cwd(), configFileName);
    if (this.existsFile(nearPath)) return nearPath;
    const scriptDir = Path.dirname(process.argv[1]);
    const scriptNearPath = Path.join(scriptDir, configFileName);
    if (this.existsFile(scriptNearPath)) return scriptNearPath;
    return '';
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
