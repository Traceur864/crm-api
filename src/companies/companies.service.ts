import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepo: Repository<Company>,
  ) {}

  create(dto: CreateCompanyDto) {
    const company = this.companiesRepo.create(dto);
    return this.companiesRepo.save(company);
  }

  findAll() {
    return this.companiesRepo.find();
  }

  async findOne(id: number) {
    const company = await this.companiesRepo.findOne({ where: { id } });
    if (!company) throw new NotFoundException(`Empresa #${id} no encontrada`);
    return company;
  }

  async update(id: number, dto: UpdateCompanyDto) {
    await this.findOne(id);
    await this.companiesRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.companiesRepo.delete(id);
    return { message: `Empresa #${id} eliminada` };
  }
}
