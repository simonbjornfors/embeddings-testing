import { runQuery } from '$lib/server/vercel';

export async function load({ url }) {
	const search_icd10 = url.searchParams.get('search_icd10');
	let whereSQL_icd10 = '';
	if (search_icd10) {
		whereSQL_icd10 = `WHERE LOWER(icd10.title) LIKE '%${search_icd10.toLowerCase()}%' OR LOWER(icd10.code) LIKE '%${search_icd10.toLowerCase()}%'`;
	}

	const icd10 = await runQuery(
		`
		SELECT
			icd10.id,
			icd10.title,
			icd10.code,
			ARRAY_AGG(kva_to_icd10.kva) AS connected_kva_codes
		FROM icd10
		LEFT JOIN kva_to_icd10 ON icd10.code = kva_to_icd10.icd10
		${whereSQL_icd10}
		GROUP BY icd10.id, icd10.title, icd10.code
		ORDER BY icd10.code ASC
		LIMIT 100`
	);
	console.log(icd10.length);



	return {
		icd10: icd10,
		search_icd10: search_icd10,
	};
}
