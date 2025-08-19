import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedApartments1723795200004 implements MigrationInterface {
  name = 'SeedApartments1723795200004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const baseImages = [
      'https://found.example.com/images/realestate/1.jpg',
      'https://found.example.com/images/realestate/2.jpg',
      'https://found.example.com/images/realestate/3.jpg',
      'https://found.example.com/images/realestate/4.jpg',
      'https://found.example.com/images/realestate/5.jpg'
    ];
    const projects = ['District 5', 'O West', 'New Giza', 'Swan Lake', 'Katameya Heights'];
    const locations = ['New Cairo', 'Alamein', 'Sheikh Zayed'];

    const rows: any[] = [];
    for (let i = 1; i <= 50; i++) {
      const project = projects[i % projects.length];
      rows.push({
        unitName: `Unit ${i}`,
        unitNumber: `${i}${String.fromCharCode(64 + (i % 26 || 26))}`,
        project,
        description: `Beautiful ${project} residence #${i}`,
        bedrooms: 1 + (i % 5),
        bathrooms: 1 + (i % 3),
        areaSqm: 60 + (i * 5) % 300,
        priceUsd: 80000 + (i * 5000),
        images: [baseImages[i % baseImages.length]]
      })
    }

    for (const r of rows) {
      await queryRunner.query(
        `INSERT INTO apartments ("unitName", "unitNumber", "project", "description", "bedrooms", "bathrooms", "areaSqm", "priceUsd", "images") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [r.unitName, r.unitNumber, r.project, r.description, r.bedrooms, r.bathrooms, r.areaSqm, r.priceUsd, r.images]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM apartments`);
  }
}

