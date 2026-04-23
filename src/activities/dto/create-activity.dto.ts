import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDateString,
} from 'class-validator';
import { ActivityType } from '../entities/activity.entity';

export class CreateActivityDto {
  @IsEnum(ActivityType)
  type: ActivityType;

  @IsString()
  description: string;

  @IsDateString()
  @IsOptional()
  scheduledAt?: Date;

  @IsInt()
  @IsOptional()
  dealId?: number;

  @IsInt()
  @IsOptional()
  contactId?: number;

  @IsInt()
  @IsOptional()
  createdById?: number;
}
