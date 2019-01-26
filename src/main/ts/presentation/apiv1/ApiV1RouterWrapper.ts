import { Router } from 'express';
import Api from '../Api';
import PhotoListApi from './PhotoListApi';
import HttpMethod from '../HttpMethod';

export default class ApiV1RouterWrapper {
    public get uri(): string {
        return '/api/v1';
    }

    private readonly apis: Api[] = [
        new PhotoListApi()
    ];

    public build(): Router {
        const router = Router();

        this.apis.forEach(api => {
            if (api.method === HttpMethod.Get) router.get(api.uri, api.execute);
            if (api.method === HttpMethod.Post) router.post(api.uri, api.execute);
        });

        return router;
    }
}