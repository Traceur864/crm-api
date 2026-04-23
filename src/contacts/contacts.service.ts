import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepo: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto) {
    const contact = this.contactsRepo.create(dto);
    return this.contactsRepo.save(contact);
  }

  findAll() {
    return this.contactsRepo.find({
      relations: ['company'],
    });
  }

  async findOne(id: number) {
    const contact = await this.contactsRepo.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!contact) throw new NotFoundException(`Contacto #${id} no encontrado`);
    return contact;
  }

  async update(id: number, dto: UpdateContactDto) {
    await this.findOne(id);
    await this.contactsRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.contactsRepo.delete(id);
    return { message: `Contacto #${id} eliminado` };
  }
}
