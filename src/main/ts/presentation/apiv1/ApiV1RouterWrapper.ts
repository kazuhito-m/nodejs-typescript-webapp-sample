import { Router } from 'express';
import Api from '../Api';
import PhotoListApi from './PhotoListApi';
import HttpMethod from '../HttpMethod';
import UsersApi from './UsersApi';
import UserService from '../../application/service/UserService';
import UserDatasource from '../../infrastracture/datasource/user/UserDatasource';

export default class ApiV1RouterWrapper {
    public get uri(): string {
        return '/api/v1';
    }

    private readonly apis: Api[] = [
        new PhotoListApi(),
        new UsersApi(new UserService(new UserDatasource())) // TODO DIになんとかできないか…
    ];

    public build(): Router {
        const router = Router();

        this.apis.forEach(api => {
            if (api.method === HttpMethod.Get) router.get(api.uri, (req, res, next) => api.execute(req, res, next));
            if (api.method === HttpMethod.Post) router.post(api.uri, (req, res, next) => api.execute(req, res, next));
        });

        return router;
    }
}