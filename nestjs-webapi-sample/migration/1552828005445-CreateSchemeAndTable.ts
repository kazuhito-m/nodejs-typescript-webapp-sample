import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchemeAndTable1552828005445 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<any> {
    await qr.query('CREATE SCHEMA sample_user AUTHORIZATION sample_user');
    await qr.query('CREATE SEQUENCE sample_user.users_seq');
    await qr.query(`CREATE TABLE sample_user.users
(
  user_identifier   BIGINT      NOT NULL PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  created_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);
  }

  public async down(qr: QueryRunner): Promise<any> {
    await qr.query('DROP SEQUENCE sample_user.users_seq');
    await qr.query('DROP TABLE sample_user.users');
    await qr.query('DROP SCHEMA sample_user');
  }
}
