import * as express from 'express';
import Parameters from "./infrastracture/datasource/config/Parameters";

export default class WebApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const settings = parameters.loadSettings();

    console.log(settings.sonarqubeUrl);

    const app = express();

    const server = app.listen(3000, function () {
      console.log("Node.js is listening to PORT:" + server.address());
    });

    // 写真のサンプルデータ
    var photoList = [
      {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
      }, {
        id: "002",
        name: "photo002.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo002.jpg"
      }
    ]

    // 写真リストを取得するAPI
    app.get("/api/photo/list", function (req, res, next) {
      res.json(photoList);
    });
  }
}
