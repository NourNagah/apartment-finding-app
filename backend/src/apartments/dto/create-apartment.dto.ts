import { IsArray, IsInt, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({ description: 'Unit name', minLength: 2, maxLength: 255, example: 'Aurum Residence' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  unitName!: string;

  @ApiProperty({ description: 'Unit number/identifier within the project', maxLength: 100, example: '12B' })
  @IsString()
  @MaxLength(100)
  unitNumber!: string;

  @ApiProperty({ description: 'Project name the unit belongs to', maxLength: 255, example: 'District 5' })
  @IsString()
  @MaxLength(255)
  project!: string;

  @ApiPropertyOptional({ description: 'Unit description', example: 'Modern apartment with park view' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Number of bedrooms', minimum: 0, example: 2 })
  @IsOptional()
  @IsInt()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ description: 'Number of bathrooms', minimum: 0, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ description: 'Area in square meters', minimum: 0, example: 120 })
  @IsOptional()
  @IsInt()
  @Min(0)
  areaSqm?: number;

  @ApiPropertyOptional({ description: 'Price in USD as string to preserve precision', example: '150000.00' })
  @IsOptional()
  @IsNumberString()
  priceUsd?: string;

  @ApiPropertyOptional({ description: 'Array of image URLs', type: [String], example: ['https://example.com/1.jpg'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}