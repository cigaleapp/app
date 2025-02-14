import { db } from '$lib/database.js';
import migrations from './migrations.json';

export async function migrate() {
	db.dialect.migrate(migrations, db.session, {
		migrationsTable: 'drizzle_migrations'
	});
}
