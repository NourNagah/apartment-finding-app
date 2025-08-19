import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMoreApartments1723795200005 implements MigrationInterface {
  name = 'SeedMoreApartments1723795200005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const baseImages = [
      'https://found.example.com/images/realestate/6.jpg',
      'https://found.example.com/images/realestate/7.jpg',
      'https://found.example.com/images/realestate/8.jpg',
      'https://found.example.com/images/realestate/9.jpg',
      'https://found.example.com/images/realestate/10.jpg'
    ];
    const projects = ['District 5', 'O West', 'New Giza', 'Swan Lake', 'Katameya Heights'];

    const rows: any[] = [];
    for (let i = 51; i <= 150; i++) {
      const project = projects[i % projects.length];
      rows.push({
        unitName: `Demo Unit ${i}`,
        unitNumber: `${i}${String.fromCharCode(64 + (i % 26 || 26))}`,
        project,
        description: `Beautiful ${project} residence #${i} (batch 2)`,
        bedrooms: 1 + (i % 5),
        bathrooms: 1 + (i % 3),
        areaSqm: 65 + (i * 7) % 320,
        priceUsd: 90000 + (i * 4500),
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
    await queryRunner.query(`DELETE FROM apartments WHERE "unitName" LIKE 'Demo Unit %' AND "description" LIKE '%(batch 2)%'`);
  }
}

