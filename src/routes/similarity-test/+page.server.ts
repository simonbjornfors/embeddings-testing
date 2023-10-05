import { runQuery } from "$lib/server/vercel";

export async function load({ url }) {
  const search_icd10 = url.searchParams.get("search_icd10");
  const text = url.searchParams.get("text");
  let whereSQL_icd10 = "";
  if (search_icd10) {
    whereSQL_icd10 = `WHERE LOWER(icd10.title) LIKE '%${search_icd10.toLowerCase()}%' OR LOWER(icd10.code) LIKE '%${search_icd10.toLowerCase()}%'`;
  }

  const icd10 = await runQuery(
    `
		SELECT
			icd10.id,
			icd10.title,
			icd10.code,
			ARRAY_AGG(JSONB_BUILD_OBJECT('title', icd10_synonym.title, 'active', icd10_synonym.active)) AS connected_synonyms
		FROM icd10
		LEFT JOIN icd10_synonym ON icd10.code = icd10_synonym.code
		${whereSQL_icd10}
		GROUP BY icd10.id, icd10.title, icd10.code
		ORDER BY icd10.code ASC
		LIMIT 100`
  );
  console.log(icd10.length);

  return {
    icd10: icd10,
    search_icd10: search_icd10,
    text: text,
  };
}
