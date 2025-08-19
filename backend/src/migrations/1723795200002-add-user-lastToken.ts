import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserLastToken1723795200002 implements MigrationInterface {
  name = 'AddUserLastToken1723795200002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "lastToken" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "lastToken"`);
  }
}