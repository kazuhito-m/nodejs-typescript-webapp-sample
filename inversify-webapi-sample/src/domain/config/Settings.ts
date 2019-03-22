import { ConnectionConfig } from 'pg';
export default interface Settings {
  port: number;
  pg: ConnectionConfig;
}
