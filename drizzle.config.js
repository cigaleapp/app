import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/db/schema.js',
	dialect: 'postgresql'
});
