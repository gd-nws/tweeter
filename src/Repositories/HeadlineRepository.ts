import { IHeadlineRepository } from "./IHeadlineRepository";
import { Connection } from "mysql";
import { IHeadline } from "../Models/IHeadline";
import { MySqlRepository } from "./MySqlRepository";

export class HeadlineRepository extends MySqlRepository
  implements IHeadlineRepository {
  constructor(db: Connection) {
    super(db);
  }

  async fetchMostPositiveHeadline(): Promise<IHeadline> {
    const sql = `
      SELECT
	    h.id       as id,
	    h.headline as headline,
	    h.origin   as origin,
	    h.link     as link
      FROM headlines h
      WHERE 
        h.predicted_class = 1
        AND DATE(h.published_at) = CURDATE() - INTERVAL 0 DAY
      ORDER BY h.semantic_value DESC
      LIMIT 10
    `;

    const results = await this.query(sql, []);

    return results[0] as IHeadline;
  }
}
