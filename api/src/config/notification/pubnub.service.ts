import { Injectable } from '@nestjs/common';
import PubNub from 'pubnub';
import { v4 as uuid } from 'uuid';
import { NotificationTypes } from './pubnub-notification';

@Injectable()
export class PubNubService {
	public pubnub: PubNub;
	constructor() {
		this.pubnub = new PubNub({
			subscribeKey: String(process.env.PUB_SUBSCRIBE_KEY),
			publishKey: process.env.PUB_PUBLISH_KEY,
			secretKey: process.env.PUB_SECRET_KEY,
			ssl: true,
			uuid: uuid(),
		});

		const channels = Object.values(NotificationTypes).filter((value) =>
			isNaN(+value),
		);

		this.pubnub.subscribe({
			channels: channels,
		});
	}
}
