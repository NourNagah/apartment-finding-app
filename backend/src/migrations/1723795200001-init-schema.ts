import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1723795200001 implements MigrationInterface {
  name = 'InitSchema1723795200001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "email" character varying(255) NOT NULL,
      "passwordHash" character varying(255) NOT NULL,
      "role" character varying(20) NOT NULL DEFAULT 'user',
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_users_email" UNIQUE ("email")
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "apartments" (
      "id" uuid NOT NULL DEFAULT gen_random_uuid(),
      "unitName" character varying(255) NOT NULL,
      "unitNumber" character varying(100) NOT NULL,
      "project" character varying(255) NOT NULL,
      "description" text,
      "bedrooms" integer NOT NULL DEFAULT 1,
      "bathrooms" integer NOT NULL DEFAULT 1,
      "areaSqm" integer,
      "priceUsd" numeric(12,2),
      "images" text[] NOT NULL DEFAULT '{}',
      "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_apartments_id" PRIMARY KEY ("id")
    )`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_apartments_unitName" ON "apartments" ("unitName")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_apartments_unitNumber" ON "apartments" ("unitNumber")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_apartments_project" ON "apartments" ("project")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_apartments_project"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_apartments_unitNumber"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_apartments_unitName"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "apartments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}