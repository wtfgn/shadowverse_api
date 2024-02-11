import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as api } from "./routers/api";
import compression from "compression";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors()); // TODO: remove this in production
app.use(express.json());
app.use(compression());
app.use("/api", api);

app.get("/", (req: Request, res: Response) => {
  res.send("Shadowverse API");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

module.exports = app;

