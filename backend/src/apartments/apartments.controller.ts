import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { QueryApartmentsDto } from './dto/query-apartments.dto';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  @ApiOperation({ summary: 'List apartments with optional search and filters' })
  @ApiOkResponse({ description: 'List with pagination', schema: {
    type: 'object',
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Apartment' } },
      total: { type: 'number', example: 50 }
    }
  } })
  @ApiQuery({ name: 'offset', required: false, description: 'Pagination offset', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Pagination limit', example: 20 })
  @ApiQuery({ name: 'search', required: false, description: 'Search string', example: 'District' })
  @ApiQuery({ name: 'project', required: false, description: 'Project filter', example: 'District 5' })
  async list(@Query() query: QueryApartmentsDto) {
    return this.apartmentsService.list(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment details by id' })
  @ApiParam({ name: 'id', description: 'Apartment ID (uuid)' })
  async get(@Param('id') id: string) {
    return this.apartmentsService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new apartment (public)' })
  @ApiBody({ type: CreateApartmentDto })
  @ApiCreatedResponse({ description: 'Created apartment', schema: { $ref: '#/components/schemas/Apartment' } })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateApartmentDto) {
    return this.apartmentsService.create(dto);
  }
}