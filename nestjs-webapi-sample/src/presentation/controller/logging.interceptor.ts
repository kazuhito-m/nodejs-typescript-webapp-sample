import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IncomingMessage } from 'http';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: Observable<any>): Observable<any> {
    console.log('NestInterceptorによるログの差し込み。');
    console.log('リクエストの最初。');
    console.log(
      '差込先:' +
        context.getClass().name +
        ',ハンドラ:' +
        context.getHandler().name,
    );
    // console.log('contextの内容:' + inspect(context));

    context.getArgs().forEach(i => {
      if (i.constructor.name === 'IncomingMessage') {
        const message = i as IncomingMessage;
        console.log('url:' + message.url + ', method:' + message.method);
      }
    });

    const now = Date.now();
    return next.pipe(
      tap(() =>
        console.log(`リクエスト返却完了。経過時間 : ${Date.now() - now}ms`),
      ),
    );
  }
}
