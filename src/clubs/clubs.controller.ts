import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';

import { ClubsService } from './clubs.service';
import {
  CreateClubDto,
  CreateEventDto,
  GetClubsDto,
  GetEventsDto,
} from './dto/club.dto';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get('front-end')
  @Render('club')
  async getClubs(@Query() getClubDto: GetClubsDto) {
    const clubsResponse = await this.clubsService.findAll(getClubDto);
    return clubsResponse;
  }

  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto);
  }

  @Get()
  findAll(@Query() getClubDto: GetClubsDto) {
    return this.clubsService.findAll(getClubDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(+id);
  }

  @Post(':id/events')
  createEvent(@Param('id') id: number, @Body() createEventDto: CreateEventDto) {
    return this.clubsService.createEvent(+id, createEventDto);
  }

  @Get(':id/events')
  getEventByClubId(
    @Param('id') id: number,
    @Query() getEventsDto: GetEventsDto,
  ) {
    return this.clubsService.getEventByClubId(+id, getEventsDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
  //   return this.clubsService.update(+id, updateClubDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clubsService.remove(+id);
  // }
}
