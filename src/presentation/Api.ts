import { Request , Response, NextFunction } from "express";
import HttpMethod from "./HttpMethod";

export default interface Api {
    uri: string;
    method: HttpMethod
    execute(req: Request, res: Response, next: NextFunction): Promise<any>;
}