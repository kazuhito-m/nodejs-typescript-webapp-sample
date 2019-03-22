import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default interface SystemConfig {
  sampleDb: PostgresConnectionOptions;
  otherDb: PostgresConnectionOptions;
}
