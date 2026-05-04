import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealStage } from './entities/deal.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  create(@Body() dto: CreateDealDto) {
    return this.dealsService.create(dto);
  }

  @Get()
  findAll() {
    return this.dealsService.findAll();
  }

  @Get('stage/:stage')
  findByStage(@Param('stage') stage: DealStage) {
    return this.dealsService.findByStage(stage);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dealsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDealDto) {
    return this.dealsService.update(id, dto);
  }

  @Patch(':id/stage')
  updateStage(
    @Param('id', ParseIntPipe) id: number,
    @Body('stage') stage: DealStage,
  ) {
    return this.dealsService.updateStage(id, stage);
  }

  @Patch(':id/desactive')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dealsService.remove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.dealsService.restore(id);
  }
}
