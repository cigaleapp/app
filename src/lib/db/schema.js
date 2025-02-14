import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import nanoid from 'nanoid';

const dates = {
	updatedAt: timestamp(),
	createdAt: timestamp().defaultNow().notNull(),
	deletedAt: timestamp()
};

const base = {
	...dates,
	id: varchar({ length: 12 }).primaryKey().$default(nanoid)
};

export const settings = pgTable('settings', {
	...base,
	id: integer()
});
