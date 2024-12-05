import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { KeywordDto, PaginationDto } from 'src/utils/dto/pagination.dto';

import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class GetClubsDto extends IntersectionType(PaginationDto, KeywordDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}

export class GetEventsDto extends IntersectionType(PaginationDto, KeywordDto) {}

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  scheduledAt: Date;
}
