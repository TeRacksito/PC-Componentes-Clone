import QueryTypes from "sequelize/lib/query-types";
import { sequelize } from "../models";

export async function searchSimilarByTerm(
  tableName: string,
  fieldName: string,
  searchTerm: string,
  maxResults: number = 5,
) {
  try {
    const results = await sequelize.query(
      `
      SELECT
        t.*,
        MATCH(t.\`${fieldName}\`) AGAINST(:searchTerm IN NATURAL LANGUAGE MODE) AS score
      FROM
        \`${tableName}\` t
      HAVING score
      ORDER BY
        score DESC
      LIMIT :maxResults;
      `,
      {
        replacements: {
          searchTerm,
          maxResults,
        },
        type: QueryTypes.SELECT,
      },
    );

    return results;
  } catch (error) {
    console.error("Error executing search query:", error);
    throw error;
  }
}
