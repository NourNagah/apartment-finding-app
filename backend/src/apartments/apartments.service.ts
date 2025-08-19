import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { QueryApartmentsDto } from './dto/query-apartments.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentsRepository: Repository<Apartment>
  ) {}

  async create(dto: CreateApartmentDto): Promise<Apartment> {
    const entity = this.apartmentsRepository.create({ ...dto });
    return this.apartmentsRepository.save(entity);
  }

  async list(query: QueryApartmentsDto): Promise<{ data: Apartment[]; total: number }> {
    const qb = this.apartmentsRepository.createQueryBuilder('a');

    if (query.search) {
      qb.andWhere(
        '(a.unitName ILIKE :s OR a.unitNumber ILIKE :s OR a.project ILIKE :s)',
        { s: `%${query.search}%` }
      );
    }

    if (query.project) {
      qb.andWhere('a.project ILIKE :project', { project: `%${query.project}%` });
    }

    qb.orderBy('a.createdAt', 'DESC')
      .offset(query.offset ?? 0)
      .limit(query.limit ?? 20);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async getById(id: string): Promise<Apartment> {
    const entity = await this.apartmentsRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Apartment not found');
    }
    return entity;
  }
}