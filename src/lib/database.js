import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';

const client = new PGlite('idb://cigale');
export const db = drizzle({ client, casing: 'snake_case' });
