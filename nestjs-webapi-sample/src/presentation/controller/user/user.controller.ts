import { Controller, Get, Param, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../../../application/serivce/user/user.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import User from '../../../domain/model/user/user';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  public async all(): Promise<User[]> {
    return await this.service.all();
  }

  @Get(':userIdentifier')
  public async get(
    @Param('userIdentifier') userIdentifier: number,
  ): Promise<User> {
    return await this.service.get(userIdentifier);
  }

  @Post()
  public async register(
    @Body() user: User,
    @Res() response: Response,
  ): Promise<void> {
    this.service.register(user);
    response.status(HttpStatus.CREATED).send();
  }
}
