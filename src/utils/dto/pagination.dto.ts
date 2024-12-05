import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @ApiPropertyOptional({ example: 'DESC' })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(['ASC', 'DESC']))
  order: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  ids?: number[];
}

export class KeywordDto {
  @ApiPropertyOptional()
  // @IsDate()
  @IsString()
  @IsOptional()
  // fromDate: Date;
  fromDate: string;

  @ApiPropertyOptional()
  // @IsDate()
  @IsString()
  @IsOptional()
  // toDate: Date;
  toDate: string;

  @ApiPropertyOptional()
  // @IsDate()
  @IsString()
  @IsOptional()
  // startTime: Date;
  startTime: string;

  @ApiPropertyOptional()
  // @IsDate()
  @IsString()
  @IsOptional()
  // endTime: Date;
  endTime: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  // @MinLength(1)
  keyword: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  // @MinLength(1)
  keySearch: string;
}
