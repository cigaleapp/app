import { migrate } from '$lib/db/migrate';

export async function load() {
	await migrate();
}
