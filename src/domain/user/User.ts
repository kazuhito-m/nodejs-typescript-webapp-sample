import { Moment } from 'moment';
import * as moment from 'moment';

export default class User {
    constructor(
        public readonly userIdentifier: number,
        public readonly name: string,
        public readonly createdAt: Moment
    ) {
    }

    public static prototypeOf(name: string) : User {
        return new User(0, name, moment());
    }
}