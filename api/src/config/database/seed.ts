import { SeedService } from './seed.service';
import { seeder } from 'nestjs-seeder';
import { ArticlesModule } from 'src/features/articles/articles.module';
import { UserModule } from 'src/features/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './database';

seeder({
	imports: [TypeOrmModule.forRoot(typeormConfig), ArticlesModule, UserModule],
}).run([SeedService]);
