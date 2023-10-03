import { POSTGRES_URL } from '$env/static/private';
import { createPool } from '@vercel/postgres';

export async function runQuery(query: string, params:string[] = []) {
	const db = createPool({
		connectionString: POSTGRES_URL
	});
	const { rows } = await db.query(query, params);

	return rows;
}