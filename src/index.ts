import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { useInit } from "./composables/useInit";
import { Card } from "./classes/Card";
import { myCache } from "./cache";
import { LanguageCode } from "./types";
import { isValidQuery, isValidLanguageCode } from "./utils/validators/query_validator";
import type { Query } from "./utils/validators/query_validator";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors()); // TODO: remove this in production
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/cards", (req: Request, res: Response) => {
  const query = req.query as Query;
  const {
    clan: clanCode,
    char_type: charTypeCode
  } = query;
  let lang = req.query.lang as LanguageCode | undefined;
  if (!isValidLanguageCode(lang)) {
    lang = "en";
  }

  // Get cards from cache
  const cachedCards: Card[] | undefined = myCache.get(`cards_${lang}`);
  if (!cachedCards) {
    console.log(`[server]: Cards not found in cache`);
    res.status(404).send("Cards not found");
    return;
  }

  // Validate query parameters
  if (!isValidQuery(query)) {
    console.log(`[server]: Invalid query parameters`);
    res.status(400).send("Invalid query parameters");
    return;
  }

  // Filter cards by query parameters
  try {
    const cards = Card.filterByQuery(cachedCards, {
      clan: clanCode,
      char_type: charTypeCode
    });
    console.log(`[server]: Sending ${cards.length} cards from cache with query parameters:
    \tclan=${clanCode?.toString() || "undefined"}
    \tchar_type=${charTypeCode?.toString() || "undefined"}`);
    res.send(cards);
  }
  catch (error) {
    console.log(error);
    res.status(400).send("Invalid query parameters");
  }
});

app.get("/cards/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let lang = req.query.lang as LanguageCode | undefined;
  if (!isValidLanguageCode(lang)) {
    lang = "en";
  }

  const cachedCards: Card[] | undefined = myCache.get(`cards_${lang}`);
  if (cachedCards) {
    const card = Card.selectByCardId(cachedCards, Number(id));
    if (card) {
      console.log(`[server]: Sending card ${card.card_id} from cache`);
      res.send(card);
    } else {
      console.log(`[server]: Card ${id} not found`);
      res.status(404).send("Card not found");
    }
  } else {
    console.log(`[server]: Cards not found in cache`);
    res.status(404).send("Cards not found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Initializing...`);
  useInit()
    .then(() => {
      console.log(`[server]: Initialization complete`);
      console.log(`[server]: Server is running at http://localhost:${port}`);
      console.log(`[server]: Cache stats: ${JSON.stringify(myCache.getStats())}`);
    })
    .catch((error) => {
      console.log(error);
    });
});