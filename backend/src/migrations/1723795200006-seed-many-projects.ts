import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedManyProjects1723795200006 implements MigrationInterface {
  name = 'SeedManyProjects1723795200006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const baseImages = [
      'https://found.example.com/images/realestate/11.jpg',
      'https://found.example.com/images/realestate/12.jpg',
      'https://found.example.com/images/realestate/13.jpg'
    ];

    const rows: any[] = [];
    for (let i = 1; i <= 100; i++) {
      const project = `Demo Project ${i}`;
      rows.push({
        unitName: `Demo Project ${i} - Unit 1`,
        unitNumber: `${i}A`,
        project,
        description: `Sample unit for ${project}`,
        bedrooms: 2 + (i % 3),
        bathrooms: 1 + (i % 2),
        areaSqm: 80 + (i % 120),
        priceUsd: 100000 + (i * 1000),
        images: [baseImages[i % baseImages.length]]
      });
    }

    for (const r of rows) {
      await queryRunner.query(
        `INSERT INTO apartments ("unitName", "unitNumber", "project", "description", "bedrooms", "bathrooms", "areaSqm", "priceUsd", "images") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [r.unitName, r.unitNumber, r.project, r.description, r.bedrooms, r.bathrooms, r.areaSqm, r.priceUsd, r.images]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM apartments WHERE "project" LIKE 'Demo Project %'`);
  }
}

