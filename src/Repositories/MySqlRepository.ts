import { Connection } from "mysql";

export class MySqlRepository {
  protected db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  /**
   * Execute a query.
   *
   * @param {string} sql - Query
   * @param {*[]} params - Query parameters
   */
  query(sql: string, params: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.query(sql, params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}
