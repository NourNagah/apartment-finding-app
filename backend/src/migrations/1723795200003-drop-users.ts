import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUsers1723795200003 implements MigrationInterface {
  name = 'DropUsers1723795200003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "users"');
  }

  public async down(): Promise<void> {
    // no-op
  }
}