import { Application } from 'express';
import * as express from 'express';
import * as request from 'supertest';

describe('PhotoListController.getPhotoList() (uri:/photo/list(GET)) のテスト', () => {
  it('写真情報が取得できる。', done => {
    const expressApplication: Application = dummyExpressServer();
    request(expressApplication)
      .get('/photo/list')
      .expect(200)
      .expect((response: request.Response) => {
        const firstPhoto = response.body[0];
        expect(firstPhoto.name).toEqual('photo001.jpg');
        expect(firstPhoto.type).toEqual('jpg');

        const secondPhoto = response.body[1];
        expect(secondPhoto.id).toEqual('002');
        expect(secondPhoto.dataUrl).toEqual(
          'http://localhost:3000/data/photo002.jpg',
        );
      })
      .end((error, response) => {
        if (error) {
          throw error;
        }
        done();
      });
  });
});

function dummyExpressServer(): Application {
  const app = express();
  app.get('/photo/list', (req, res) => {
    const photoList = [
      {
        dataUrl: 'http://localhost:3000/data/photo001.jpg',
        id: '001',
        name: 'photo001.jpg',
        type: 'jpg',
      },
      {
        dataUrl: 'http://localhost:3000/data/photo002.jpg',
        id: '002',
        name: 'photo002.jpg',
        type: 'jpg',
      },
    ];
    res.json(photoList);
  });
  return app;
}
