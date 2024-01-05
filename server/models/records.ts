// Imports libraries
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: "./server/.env" });

// Declares types
type Difficulty = "Easy" | "Medium" | "Hard" | "Extreme";
export type Record = {
  id: number;
  time: string;
  name: string;
  difficulty: Difficulty;
};

type AddRecordParam = {
  time: Record["time"];
  name: Record["name"];
  difficulty: Record["difficulty"];
};

const prisma = new PrismaClient();

class RecordsAPI {
  async getRecords() {
    try {
      const records = await prisma.record.findMany({});
      return records;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addRecord(newRecord: AddRecordParam) {
    try {
      await prisma.record.create({ data: {
        name: newRecord.name,
        time: newRecord.time,
        difficulty: newRecord.difficulty
      }});

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export { RecordsAPI };
