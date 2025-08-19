import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryApartmentsDto {
  @ApiPropertyOptional({ description: 'Offset for pagination', minimum: 0, example: 0 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({ description: 'Limit for pagination', minimum: 1, example: 20 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Full-text search across unitName, unitNumber, and project', example: 'District' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by project name (ILIKE)', example: 'District 5' })
  @IsOptional()
  @IsString()
  project?: string;
}