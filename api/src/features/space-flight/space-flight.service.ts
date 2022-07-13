import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';
import * as AxiosLogger from 'axios-logger';
import { AxiosError } from 'axios';
import { SpaceFlightListParams } from './dto/list-params.dto';
import { SpaceFlightArticle } from './schemas/space-flight-article';

@Injectable()
export class SpaceFlightService {
	constructor(private httpService: HttpService) {
		this.httpService.axiosRef.interceptors.request.use(
			AxiosLogger.requestLogger,
			AxiosLogger.errorLogger,
		);

		this.httpService.axiosRef.interceptors.response.use(
			(response) =>
				AxiosLogger.responseLogger(response, {
					status: true,
					data: false,
					statusText: true,
				}),
			AxiosLogger.errorLogger,
		);
	}

	public async getArticlesCount() {
		try {
			const count$ = this.httpService
				.get<number>('/articles/count')
				.pipe(map((response) => response.data));

			const count = await lastValueFrom(count$);
			return count;
		} catch (e) {
			this.handleError(e);
		}
	}

	public async getArticles(params: SpaceFlightListParams) {
		try {
			const list$ = this.httpService
				.get<SpaceFlightArticle[]>(
					`/articles/?_limit=${params._limit || 100}&_start=${
						params._start || 0
					}`,
				)
				.pipe(map((response) => response.data));
			const list = await lastValueFrom(list$);
			return list;
		} catch (e) {
			this.handleError(e);
		}
	}

	public async getOneArticle(id: string) {
		try {
			const product$ = this.httpService
				.get<any>(`/articles/${id}/`)
				.pipe(map((response) => response.data));
			const product = await lastValueFrom(product$);
			return product;
		} catch (e) {
			this.handleError(e);
		}
	}

	private handleError(e: AxiosError) {
		throw new HttpException(
			e.response.statusText,
			e.response.status || HttpStatus.SERVICE_UNAVAILABLE,
		);
	}
}
