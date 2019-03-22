import { Moment } from 'moment';
import * as moment from 'moment';

export default class User {

    public static prototypeOf(name: string): User {
        return new User(0, name, moment());
    }
    constructor(
        public readonly userIdentifier: number,
        public readonly name: string,
        public readonly createdAt: Moment,
    ) {
    }
}
