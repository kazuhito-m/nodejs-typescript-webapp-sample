import { Moment } from 'moment';

export default class User {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly createAt: Moment
    ) {
    }
}