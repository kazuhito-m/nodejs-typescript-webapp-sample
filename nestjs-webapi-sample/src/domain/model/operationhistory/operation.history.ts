import { Moment } from 'moment';
import moment = require('moment');

export default class OperationHistory {
  public static of(url: string, description: string): OperationHistory {
    return new OperationHistory(0, url, description, moment());
  }

  constructor(
    public readonly opertionHistoryIdentifier: number,
    public readonly url: string,
    public readonly description: string,
    public readonly createdAt: Moment,
  ) {}
}
