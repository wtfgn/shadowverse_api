import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { useInit } from "./composables/useInit";
import { myCache } from "./cache";
import { router as api } from "./routers/api";

dotenv.config();

export const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors()); // TODO: remove this in production
app.use(express.json());
app.use("/api", api);

app.get("/", (req: Request, res: Response) => {
  res.send("Shadowverse API");
});

app.listen(port, () => {
  console.log(`[server]: Initializing...`);
  useInit()
    .then(() => {
      console.log(`[server]: Initialization complete`);
      console.log(`[server]: Cache stats: ${JSON.stringify(myCache.getStats())}`);
    })
    .catch((error) => {
      console.log(error);
    });
  }
);


