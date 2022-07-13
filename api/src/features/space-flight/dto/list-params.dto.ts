import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class SpaceFlightListParams {
	@ApiProperty()
	@IsOptional()
	@Transform((data) => Number(data.value))
	@IsInt()
	_limit?: number;

	@ApiProperty()
	@IsOptional()
	@Transform((data) => Number(data.value))
	@IsInt()
	_start?: number;
}
