import { ApiProperty } from '@nestjs/swagger';

export class GenericList<T> {
	@ApiProperty()
	page: number;
	@ApiProperty()
	total: number;
	@ApiProperty()
	list: T[];
}
