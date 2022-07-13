import { Injectable, Logger } from '@nestjs/common';

import { SpaceFlightService } from 'src/features/space-flight/space-flight.service';

import {
	NotificationTypes,
	PubNubNotification,
} from 'src/config/notification/pubnub-notification';
import { SpaceFlightArticle } from 'src/features/space-flight/schemas/space-flight-article';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../article.entity';
import { Repository } from 'typeorm';
import { PubNubService } from 'src/config/notification/pubnub.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ArticlesImportService {
	logger = new Logger(ArticlesImportService.name);

	constructor(
		private spaceFlightService: SpaceFlightService,
		@InjectRepository(Article)
		private readonly articleRepository: Repository<Article>,
		private readonly pubnubService: PubNubService,
	) {
		pubnubService.pubnub.addListener({
			message: (data) => {
				this.logger.verbose(
					`PUBNUB ${data.channel}: ${JSON.stringify(data.message)}}`,
				);
			},
		});
	}

	public async import() {
		const message: PubNubNotification = {
			text: 'Article Import',
			type: NotificationTypes.ARTICLES,
			success: true,
		};
		try {
			await this.importJob();

			this.pubnubService.pubnub.publish(
				{
					channel: NotificationTypes.ARTICLES,
					message: message,
				},
				(status, response) => {
					if (status.error) this.logger.error('PUBNUB ERROR', status);
				},
			);
		} catch (err) {
			console.log(err);
			message.success = false;
			message.text = err;
			this.pubnubService.pubnub.publish({
				channel: NotificationTypes.ARTICLES,
				message,
			});
		}
	}

	@Cron('0 9 * * *')
	async importJob() {
		const articlesPerRequest = 500;
		const totalArticles = await this.spaceFlightService.getArticlesCount();

		const articlesImported: SpaceFlightArticle[] = [];

		const requestsNeeded = Math.ceil(totalArticles / articlesPerRequest);
		this.logger.debug(`Total articles ${totalArticles}`);
		this.logger.debug(`Total requests ${requestsNeeded}`);

		let count = 1;
		let start = 0;

		while (count <= requestsNeeded) {
			const articles = await this.spaceFlightService.getArticles({
				_limit: articlesPerRequest,
				_start: start,
			});

			try {
				await this.articleRepository.save(articles);
				articlesImported.push(...articles);
			} catch (e) {
				this.logger.error(e);
			}

			count++;
			start += articlesPerRequest;
		}

		return articlesImported;
	}
}
