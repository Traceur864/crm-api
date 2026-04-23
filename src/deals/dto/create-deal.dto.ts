import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { DealStage } from '../entities/deal.entity';

export class CreateDealDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsEnum(DealStage)
  @IsOptional()
  stage?: DealStage;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsOptional()
  expectedCloseDate?: Date;

  @IsInt()
  @IsOptional()
  contactId?: number;

  @IsInt()
  @IsOptional()
  assignedToId?: number;
}
