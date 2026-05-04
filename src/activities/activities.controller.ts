import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() dto: CreateActivityDto) {
    return this.activitiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get('deal/:dealId')
  findByDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    return this.activitiesService.findByDeal(dealId);
  }

  @Get('contact/:contactId')
  findByContact(@Param('contactId', ParseIntPipe) contactId: number) {
    return this.activitiesService.findByContact(contactId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(id, dto);
  }

  @Patch(':id/desactive')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.activitiesService.restore(id);
  }
}
