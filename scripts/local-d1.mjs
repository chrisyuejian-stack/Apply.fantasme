// Development-only subset of D1, backed by Node's SQLite. Never points at Cloudflare.
import { DatabaseSync } from 'node:sqlite';

export class LocalDatabase {
  constructor(filename) { this.raw = new DatabaseSync(filename); }
  prepare(query) {
    const database = this.raw;
    return {
      query, values: [],
      bind(...values) { this.values = values; return this; },
      async first(column) {
        const row = database.prepare(query).get(...this.values);
        return row ? (column ? row[column] : row) : null;
      },
      async all() { return { success: true, results: database.prepare(query).all(...this.values) }; },
      async run() {
        const result = database.prepare(query).run(...this.values);
        return { success: true, meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
      },
    };
  }
  async batch(statements) {
    this.raw.exec('BEGIN IMMEDIATE');
    try {
      const results = [];
      for (const statement of statements) {
        results.push(this.raw.prepare(statement.query).columns().length ? await statement.all() : await statement.run());
      }
      this.raw.exec('COMMIT');
      return results;
    } catch (error) {
      this.raw.exec('ROLLBACK');
      throw error;
    }
  }
  close() { this.raw.close(); }
}
