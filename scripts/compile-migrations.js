// https://github.com/drizzle-team/drizzle-orm/discussions/2532#discussioncomment-10780523

import { readMigrationFiles } from 'drizzle-orm/migrator';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

const migrations = readMigrationFiles({ migrationsFolder: './drizzle/' });

await writeFile(
	join(import.meta.dirname, '../src/lib/db/migrations.json'),
	JSON.stringify(migrations)
);
