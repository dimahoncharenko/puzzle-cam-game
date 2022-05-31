// Imports libraries
import express from "express";
import cors from "cors";
import { config } from "dotenv";

// Imports API
import recordsAPI from "../server/api/records";

config({ path: "./server/.env" });
const app = express();

// Init Express variables and middlewares
app.set("PORT", process.env.PORT);
app.use(express.json());
app.use(cors());

app.use(recordsAPI);

app.listen(app.get("PORT"), () => {
  console.log(`Server has ready on ${app.get("PORT")} port...`);
});
