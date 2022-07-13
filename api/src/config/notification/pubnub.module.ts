import { Module } from '@nestjs/common';
import { PubNubService } from './pubnub.service';

@Module({
	imports: [],
	providers: [PubNubService],
	exports: [PubNubService],
})
export class PubNubModule {}
