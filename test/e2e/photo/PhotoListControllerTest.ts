import 'reflect-metadata';
import PhotoListController from '../../../src/presentation/apiv1/photo/PhotoListController';

describe('PhotoListController.getPhotoList()のテスト(こちらはexpressを通さない版)', () => {
  const sut = new PhotoListController();

  it('写真情報が取得できる。', () => {
    const actual = sut.getPhotoList();

    const p1 = actual.json[0];
    expect(p1.name).toEqual('photo001.jpg');
    expect(p1.type).toEqual('jpg');

    const p2 = actual.json[1];
    expect(p2.id).toEqual('002');
    expect(p2.dataUrl).toEqual('http://localhost:3000/data/photo002.jpg');
  });
});
