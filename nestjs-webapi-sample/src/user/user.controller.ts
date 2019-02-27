import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user-entity';
import { Response, response } from 'express';
import { inspect } from 'util';
import { Repository } from 'typeorm';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  public async all(): Promise<UserEntity[]> {
    const users = await this.service.all();
    return users;
  }

  @Get(':userIdentifier')
  public async user(
    @Param('userIdentifier') userIdentifier: number,
  ): Promise<UserEntity> {
    return await this.service.get(userIdentifier);
  }

  @Post()
  public async register(
    @Body() user: UserEntity,
    @Res() res: Response,
  ): Promise<void> {
    await this.service.register(user);
    res.status(HttpStatus.CREATED).send();
  }
}
