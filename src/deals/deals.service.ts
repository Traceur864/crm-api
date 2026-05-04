import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal, DealStage } from './entities/deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealsRepo: Repository<Deal>,
  ) {}

  create(dto: CreateDealDto) {
    const deal = this.dealsRepo.create(dto);
    return this.dealsRepo.save(deal);
  }

  findAll() {
    return this.dealsRepo.find({
      relations: ['contact', 'assignedTo'],
    });
  }

  async findOne(id: number) {
    const deal = await this.dealsRepo.findOne({
      where: { id },
      relations: ['contact', 'assignedTo'],
    });
    if (!deal) throw new NotFoundException(`Deal #${id} no encontrado`);
    return deal;
  }

  async update(id: number, dto: UpdateDealDto) {
    await this.findOne(id);
    await this.dealsRepo.update(id, dto);
    return this.findOne(id);
  }

  async updateStage(id: number, stage: DealStage) {
    await this.findOne(id);
    await this.dealsRepo.update(id, { stage });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.dealsRepo.softDelete(id);
    return { message: `Deal #${id} desactivado` };
  }

  findByStage(stage: DealStage) {
    return this.dealsRepo.find({
      where: { stage },
      relations: ['contact', 'assignedTo'],
    });
  }

  async restore(id: number) {
    await this.findOne(id);
    await this.dealsRepo.restore(id);
    return { message: `Deal #${id} restaurado` };
  }
}
