import { Controller, Get, Param, Post, Body, HttpStatus } from '@nestjs/common';
import { UserService } from '../../../application/serivce/user/user.service';
import { UserEntity } from '../../../infrastracture/datasource/user/user-entity';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  public async all(): Promise<UserEntity[]> {
    return await this.service.all();
  }

  @Get(':userIdentifier')
  public async get(
    @Param('userIdentifier') userIdentifier: number,
  ): Promise<UserEntity> {
    return await this.service.get(userIdentifier);
  }

  @Post()
  public async register(
    @Body() userEntity: UserEntity,
    @Res() response: Response,
  ): Promise<void> {
    this.service.register(userEntity);
    response.status(HttpStatus.CREATED).send();
  }
}
