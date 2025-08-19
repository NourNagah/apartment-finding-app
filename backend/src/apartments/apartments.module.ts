import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService]
})
export class ApartmentsModule {}