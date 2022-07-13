import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from './database';

@Module({
	imports: [TypeOrmModule.forRoot(typeormConfig)],
})
export class DatabaseModule {}
