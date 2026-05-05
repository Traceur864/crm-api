import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepo: Repository<Activity>,
  ) {}

  create(dto: CreateActivityDto) {
    const activity = this.activitiesRepo.create(dto);
    return this.activitiesRepo.save(activity);
  }

  findAll() {
    return this.activitiesRepo.find({
      relations: ['deal', 'contact', 'createdBy'],
    });
  }

  async findOne(id: number) {
    const activity = await this.activitiesRepo.findOne({
      where: { id },
      relations: ['deal', 'contact', 'createdBy'],
    });
    if (!activity)
      throw new NotFoundException(`Actividad #${id} no encontrada`);
    return activity;
  }

  findByDeal(dealId: number) {
    return this.activitiesRepo.find({
      where: { dealId },
      relations: ['contact', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  findByContact(contactId: number) {
    return this.activitiesRepo.find({
      where: { contactId },
      relations: ['deal', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateActivityDto) {
    await this.findOne(id);
    await this.activitiesRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.activitiesRepo.softDelete(id);
    return { message: `Actividad #${id} eliminada` };
  }

  async restore(id: number) {
    await this.findOne(id);
    await this.activitiesRepo.restore(id);
    return { message: `Actividad #${id} restaurada` };
  }
}
