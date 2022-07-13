import {
	IsBoolean,
	IsDate,
	IsInt,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	SpaceFlightEvent,
	SpaceFlightLaunch,
} from 'src/features/space-flight/schemas/space-flight-article';

export class CreateArticleDto {
	@ApiProperty()
	@Transform((data) => +data.value)
	@IsInt()
	@Min(1)
	id: number;

	@ApiProperty()
	@IsBoolean()
	featured: false;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	url?: string;

	@ApiProperty()
	@IsString()
	imageUrl: string;

	@ApiProperty()
	@IsString()
	newsSite: string;

	@IsOptional()
	@ApiPropertyOptional()
	@IsString()
	summary?: string;

	@IsOptional()
	@ApiPropertyOptional({
		description: 'date string format 01-01-2000',
	})
	@IsString()
	@Transform((t) => {
		const date = new Date(t.value);
		return date.toISOString();
	})
	publishedAt?: string;

	@IsOptional()
	@ApiPropertyOptional({ type: [SpaceFlightLaunch] })
	launches: SpaceFlightLaunch[];

	@IsOptional()
	@ApiPropertyOptional({ type: [SpaceFlightLaunch] })
	events: SpaceFlightEvent[];
}

export class UpdateArticleDto {
	@IsOptional()
	@ApiPropertyOptional()
	@IsBoolean()
	featured: false;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	title: string;

	@IsOptional()
	@ApiPropertyOptional()
	@IsString()
	url?: string;

	@IsOptional()
	@ApiPropertyOptional()
	@IsString()
	imageUrl: string;

	@IsOptional()
	@ApiPropertyOptional()
	@IsString()
	newsSite: string;

	@IsOptional()
	@ApiPropertyOptional()
	@IsString()
	summary?: string;

	@IsOptional()
	@ApiPropertyOptional()
	@IsDate()
	@Transform((t) => {
		const date = t.value as Date;
		return date.toISOString();
	})
	publishedAt?: string;

	@IsOptional()
	@ApiPropertyOptional({ type: [SpaceFlightLaunch] })
	launches: SpaceFlightLaunch[];

	@IsOptional()
	@ApiPropertyOptional({ type: [SpaceFlightEvent] })
	events: SpaceFlightEvent[];
}
