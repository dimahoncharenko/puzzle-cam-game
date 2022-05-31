// Imports libraries
import { Pool } from "pg";
import { config } from "dotenv";

config({ path: "./server/.env" });

// Declares types
type Difficulty = "Easy" | "Medium" | "Hard" | "Extreme";
type Record = {
  id: number;
  time: string;
  name: string;
  difficulty: Difficulty;
};

type AddRecordParam = {
  time: string;
  name: string;
  difficulty: Difficulty;
};

const pool = new Pool({
  user: process.env.PG_USER,
  host: "localhost",
  port: 9969,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
});

class RecordsAPI {
  async getRecords() {
    try {
      const records = await pool.query<Record[]>(
        `SELECT * FROM ${process.env.PG_TABLE}`
      );

      return records.rows;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addRecord(newRecord: AddRecordParam) {
    try {
      await pool.query(
        `INSERT INTO ${process.env.PG_TABLE} (name, time, difficulty) VALUES ($1, $2, $3)`,
        [newRecord.name, newRecord.time, newRecord.difficulty]
      );

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export { RecordsAPI };
