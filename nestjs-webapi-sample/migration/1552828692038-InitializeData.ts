import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeData1552828692038 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<any> {
    await qr.query(
      'INSERT INTO sample_user.users (user_identifier, name) VALUES (nextval(\'sample_user.users_seq\'), \'三浦 一仁\')',
    );
    await qr.query(
      'INSERT INTO sample_user.users(user_identifier, name) VALUES(nextval(\'sample_user.users_seq\'), \'ふなっしー\')',
    );
    await qr.query(
      'INSERT INTO sample_user.users(user_identifier, name) VALUES(nextval(\'sample_user.users_seq\'), \'名無っしー\')',
    );
  }

  public async down(qr: QueryRunner): Promise<any> {
    await qr.query('DELETE FROM sample_user.users');
  }
}
