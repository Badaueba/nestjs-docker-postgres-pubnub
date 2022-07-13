import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { SpaceFlightService } from './space-flight.service';
import { SpaceFlightArticle } from './schemas/space-flight-article';

export const mockArticleList: SpaceFlightArticle[] = [
	{
		id: 1,
		featured: false,
		imageUrl: '',
		newsSite: '',
		publishedAt: '20/10/2022',
		summary: 'flight article 1',
		title: 'flight article title',
		url: 'www.flights/article1',
		events: [],
		launches: [],
	},
];

const mockList$: Observable<SpaceFlightArticle[]> = of(mockArticleList);

const httpMock = jest.fn(() => ({
	get: jest.fn().mockResolvedValue(mockList$),
	axiosRef: {
		interceptors: {
			request: { use: jest.fn(), eject: jest.fn() },
			response: { use: jest.fn(), eject: jest.fn() },
		},
	},
}))();

// get: jest.fn().mockResolvedValue(mockArticleList),

describe('Service', () => {
	let service: SpaceFlightService;
	let httpService: HttpService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SpaceFlightService,
				{
					provide: HttpService,
					useValue: httpMock,
				},
			],
		}).compile();

		service = module.get<SpaceFlightService>(SpaceFlightService);
		httpService = module.get<HttpService>(HttpService);

		jest.mock('axios', () => {
			return {
				create: jest.fn(() => ({
					get: jest.fn(),
					interceptors: {
						request: { use: jest.fn(), eject: jest.fn() },
						response: { use: jest.fn(), eject: jest.fn() },
					},
				})),
			};
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
