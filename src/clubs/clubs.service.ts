import { Pagination } from 'src/utils/interface/pagination.interface';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateClubDto,
  CreateEventDto,
  GetClubsDto,
  GetEventsDto,
} from './dto/club.dto';
import { Club } from './entities/club.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class ClubsService {
  readonly clubRelations: FindOptionsRelations<Club>;
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {
    this.clubRelations = {
      events: true,
    };
  }
  async create(createClubDto: CreateClubDto) {
    const uniqueName = await this.clubRepository.findOne({
      where: {
        name: createClubDto.name,
      },
    });
    if (uniqueName) {
      throw new HttpException(
        {
          status: 400,
          message: 'Club name already exists',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(),
        },
      );
    }

    const newClub = this.clubRepository.create(createClubDto);
    await this.clubRepository.save(newClub);
    return newClub;
  }

  async findAll(getClubDto: GetClubsDto) {
    console.log(getClubDto);
    const { page, pageSize, order, name } = getClubDto;
    const skip = (page - 1) * pageSize;
    const conditions: FindOptionsWhere<Club> = {};

    if (name) {
      Object.assign(conditions, {
        name: Like(`%${name}%`),
      });
    }
    const [data, total] = await this.clubRepository.findAndCount({
      where: conditions,
      relations: this.clubRelations,
      skip,
      take: pageSize,
      order: { createdAt: order, events: { scheduledAt: 'ASC' } },
    });

    return Pagination.create(data, total, page, pageSize);
  }

  async findOne(id: number) {
    const club = await this.clubRepository.findOne({
      where: {
        id,
      },
      relations: this.clubRelations,
    });

    if (!club) {
      throw new HttpException(
        {
          status: 404,
          message: 'Club not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: new Error(),
        },
      );
    }
    return club;
  }

  async createEvent(clubId: number, createEventDto: CreateEventDto) {
    const club = await this.findOne(+clubId);
    Object.assign(createEventDto, { clubId: club.id });
    const newEvent = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(newEvent);
    return newEvent;
  }

  async getEventByClubId(clubId: number, getEventsDto: GetEventsDto) {
    const { page, pageSize, order } = getEventsDto;
    const skip = (page - 1) * pageSize;

    const conditions: FindOptionsWhere<Club> = {};

    Object.assign(conditions, {
      clubId,
    });

    const [data, total] = await this.eventRepository.findAndCount({
      where: conditions,
      // relations: this.clubRelations,
      skip,
      take: pageSize,
      order: { createdAt: order },
    });

    return Pagination.create(data, total, page, pageSize);
  }

  remove(id: number) {
    return `This action removes a #${id} club`;
  }
}
