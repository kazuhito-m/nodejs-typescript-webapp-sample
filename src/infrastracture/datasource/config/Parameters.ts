import * as fs from "fs";
import * as program from "commander";
import Settings from "../../../domain/config/Settings";

export default class Parameters {
  private static readonly DEFAULT_SETTINGS_PATH = './config/settings.json';

  constructor(args: string[]) {
    program
      .option("-s, --settings <path>", "設定ファイルのPath。")
      .parse(args);
  }

  public analyzeArgs() {
    if (program.settings === undefined)
    // TODO おそらく「自身JSからの相対パス」にすることができたほうが良さそう。
    program.settings = Parameters.DEFAULT_SETTINGS_PATH;
    return program;
  }

  public loadSettings(): Settings {
    const settingFilePath: string = program.settings;
    return this.loadJsonFileToObject(settingFilePath);
  }

  private loadJsonFileToObject(filePath: string) {
    const jsonText = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonText);
  }
}