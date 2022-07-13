import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
	let controller: AppController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
		}).compile();

		controller = module.get<AppController>(AppController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('Should return string', () => {
		expect(controller.helthcheck()).toStrictEqual(
			'Back-end Challenge 2022 🏅 - Space Flight News',
		);
	});
});
