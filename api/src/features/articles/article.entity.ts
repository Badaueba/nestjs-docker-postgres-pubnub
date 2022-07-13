import {} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import {
	SpaceFlightEvent,
	SpaceFlightLaunch,
} from '../space-flight/schemas/space-flight-article';

@Entity('articles')
export class Article extends BaseEntity {
	@PrimaryColumn({
		type: 'int',
		unique: true,
		nullable: false,
	})
	@ApiProperty()
	public readonly id: number;

	@ApiProperty()
	@Column({
		type: 'boolean',
		default: false,
		nullable: false,
	})
	featured: false;

	@ApiProperty()
	@Column({
		type: 'varchar',
		default: '',
		nullable: false,
	})
	title: string;

	@ApiProperty()
	@Column({
		type: 'varchar',
	})
	url: string;

	@ApiProperty()
	@Column({
		type: 'varchar',
		default: '',
		nullable: false,
	})
	imageUrl: string;

	@ApiProperty()
	@Column({
		type: 'varchar',
		default: '',
		nullable: false,
	})
	newsSite: string;

	@ApiProperty()
	@Column({
		type: 'varchar',
		default: '',
	})
	summary: string;

	@ApiProperty()
	@Column({
		type: 'varchar',
		default: new Date().toISOString(),
		nullable: false,
	})
	publishedAt: string;

	@ApiProperty({ type: [SpaceFlightLaunch] })
	@Column({
		type: 'jsonb',
		default: () => "'[]'",
		array: false,
		nullable: false,
	})
	launches!: SpaceFlightLaunch[];

	@ApiProperty({ type: [SpaceFlightEvent] })
	@Column({
		type: 'jsonb',
		default: () => "'[]'",
		array: false,
		nullable: false,
	})
	events: SpaceFlightEvent[];

	constructor(props: Partial<Article>) {
		super();
		Object.assign(this, props);
	}
}
