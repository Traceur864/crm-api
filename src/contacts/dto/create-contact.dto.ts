import { IsString, IsOptional, IsEmail, IsEnum, IsInt } from 'class-validator';
import { ContactStatus } from '../entities/contact.entity';

export class CreateContactDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsEnum(ContactStatus)
  @IsOptional()
  status?: ContactStatus;

  @IsInt()
  @IsOptional()
  companyId?: number;
}
