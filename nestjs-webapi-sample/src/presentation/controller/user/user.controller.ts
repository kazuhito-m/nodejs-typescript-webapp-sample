import { Controller, Get, Param, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../../../application/serivce/user/user.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import User from '../../../domain/model/user/user';
import * as Log4js from 'log4js/lib/log4js';

@Controller('api/v1/users')
export class UserController {
  private readonly logger = Log4js.getLogger();

  constructor(private readonly service: UserService) {}

  @Get()
  public async all(): Promise<User[]> {
    this.logger.debug('ユーザ全件取得開始。');
    return await this.service.all();
  }

  @Get(':userIdentifier')
  public async get(
    @Param('userIdentifier') userIdentifier: number,
  ): Promise<User> {
    this.logger.debug('ユーザ一件取得開始。');
    return await this.service.get(userIdentifier);
  }

  @Post()
  public async register(
    @Body() user: User,
    @Res() response: Response,
  ): Promise<void> {
    this.logger.debug('ユーザ登録開始。');
    this.service.register(user);
    response.status(HttpStatus.CREATED).send();
  }
}
