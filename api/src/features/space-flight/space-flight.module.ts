import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpaceFlightService } from './space-flight.service';

@Module({
	providers: [SpaceFlightService],
	imports: [
		HttpModule.register({
			baseURL: process.env.EXTERNAL_PRODUCTS_API,
		}),
	],
	exports: [SpaceFlightService],
})
export class SpaceFlightModule {}
