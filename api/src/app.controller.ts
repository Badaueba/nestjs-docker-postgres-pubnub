import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

@ApiTags('Main')
@UseFilters(HttpExceptionFilter)
@Controller('/')
export class AppController {
	@Get()
	@ApiOperation({
		summary: 'health check route',
	})
	@ApiOkResponse({
		type: String,
	})
	public helthcheck() {
		return `Back-end Challenge 2022 🏅 - Space Flight News`;
	}
}
