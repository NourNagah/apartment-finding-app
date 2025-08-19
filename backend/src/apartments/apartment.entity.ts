import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'apartments' })
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Apartment ID', example: '5a4370cb-3c48-4c25-8e5d-b6d5b6f6a2dd' })
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Unit name', example: 'Aurum Residence' })
  unitName!: string;

  @Index()
  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Unit number', example: '12B' })
  unitNumber!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Project name', example: 'District 5' })
  project!: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false, description: 'Description', example: 'Modern apartment with park view' })
  description?: string | null;

  @Column({ type: 'int', default: 1 })
  @ApiProperty({ description: 'Bedrooms count', example: 2 })
  bedrooms!: number;

  @Column({ type: 'int', default: 1 })
  @ApiProperty({ description: 'Bathrooms count', example: 1 })
  bathrooms!: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ required: false, description: 'Area (sqm)', example: 120 })
  areaSqm?: number | null;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  @ApiProperty({ required: false, description: 'Price in USD', example: '150000.00' })
  priceUsd?: string | null;

  @Column({ type: 'text', array: true, default: '{}' })
  @ApiProperty({ type: [String], description: 'Image URLs', example: ['https://.../1.jpg'] })
  images!: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ description: 'Created timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ description: 'Updated timestamp' })
  updatedAt!: Date;
}