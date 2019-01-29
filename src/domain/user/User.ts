import { Moment } from 'moment';

export default class User {
    constructor(
        public readonly userIdentifier: number,
        public readonly name: string,
        public readonly createdAt: Moment
    ) {
    }
}