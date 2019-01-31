import { Application } from 'express';
import * as request from 'supertest';
import { Response } from 'supertest';
import buildExpressApplicationForTest from '../test_index';

describe('PhotoListController.getPhotoList() (uri:/photo/list(GET)) のテスト', () => {
  it('写真情報が取得できる。', done => {
    const expressApplication: Application = buildExpressApplicationForTest();
    request(expressApplication)
      .get('/api/v1/photo/list')
      .expect(200)
      .expect((response: Response) => {
        const p1 = response.body[0];
        expect(p1.name).toEqual('photo001.jpg');
        expect(p1.type).toEqual('jpg');

        const p2 = response.body[1];
        expect(p2.id).toEqual('002');
        expect(p2.dataUrl).toEqual('http://localhost:3000/data/photo002.jpg');
      })
      .end((error, response) => {
        if (error) throw error;
        done();
      });
  });
});
