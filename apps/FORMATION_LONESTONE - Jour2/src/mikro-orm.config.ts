import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
    entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`
    entitiesTs: ['./src/entities'],
    dbName: 'books-db',
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    debug: true,
    metadataProvider: TsMorphMetadataProvider,
    seeder: {
        path: './dist/seeders',
        pathTs: './src/seeders',
    },
});
