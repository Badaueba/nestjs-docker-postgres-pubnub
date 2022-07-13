import { ApiProperty } from '@nestjs/swagger';

export class SpaceFlightEvent {
	@ApiProperty()
	id: number;
	@ApiProperty()
	provider: string;
}

export class SpaceFlightLaunch {
	@ApiProperty()
	id: string;
	@ApiProperty()
	provider: string;
}

export class SpaceFlightArticle {
	@ApiProperty()
	id: number;
	@ApiProperty()
	featured: false;
	@ApiProperty()
	title: string;
	@ApiProperty()
	url: string;
	@ApiProperty()
	imageUrl: string;
	@ApiProperty()
	newsSite: string;
	@ApiProperty()
	summary: string;
	@ApiProperty()
	publishedAt: string;

	@ApiProperty({ type: [SpaceFlightLaunch] })
	launches: SpaceFlightLaunch[];

	@ApiProperty({ type: [SpaceFlightEvent] })
	events: SpaceFlightEvent[];
}
