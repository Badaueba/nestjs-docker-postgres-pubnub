import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
	IsUUID,
	Min,
} from 'class-validator';

export class UUIDParamDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	id: string;
}

export class PageParams {
	@ApiPropertyOptional()
	@IsOptional()
	@Transform((data) => +data.value)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiPropertyOptional()
	@IsOptional()
	@Transform((data) => +data.value)
	@IsInt()
	@Min(1)
	limit?: number;
}
