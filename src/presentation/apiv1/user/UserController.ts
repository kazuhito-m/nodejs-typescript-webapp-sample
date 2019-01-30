import { interfaces, controller, httpGet } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';

@controller('/users')
export default class UserController implements interfaces.Controller {
  @httpGet('/')
  public index(req: Request, res: Response, next: NextFunction): string {
    return 'よくわからないが、タダの文字列を返せるんかな？';
  }
}
