import {  BaseHttpController, controller, httpGet } from 'inversify-express-utils';

@controller('/photo/list')
export default class PhotoListController extends BaseHttpController {
  @httpGet('/')
  public getPhotoList() {
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
    return this.json(photoList, 200);
  }
}
