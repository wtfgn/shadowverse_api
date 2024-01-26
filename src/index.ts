import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { useFetchCards } from "./composables/useFetchCards";
import { useInit } from "./composables/useInit";
import { Card } from "./classes/Card";
import { useCache } from "./composables/useCache";
import { isLanguageCode } from "./utils/validators/language_validator";
import { LanguageCode } from "./types";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;
const { myCache } = useCache();

app.use(cors()); // TODO: remove this in production
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/cards", (req: Request, res: Response) => {
  let lang = req.query.lang as LanguageCode | undefined;
  if (!lang || (lang && !isLanguageCode(lang))) {
    lang = "en";
  }

  const cachedCards: Card[] | undefined = myCache.get(`cards_${lang}`);
  if (cachedCards) {
    // Send cached cards
    console.log(`[server]: Sending ${cachedCards.length} cards from cache`)
    res.send(cachedCards);
  } else {
    // Fetch cards from API
    useFetchCards(lang)
      .then((cards) => {
        console.log(`[server]: Sending ${cards?.length} cards from API`);
        res.send(cards);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Something went wrong");
      });
  }
});

app.get("/cards/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let lang = req.query.lang as LanguageCode | undefined;
  if (!lang || (lang && !isLanguageCode(lang))) {
    lang = "en";
  }
  const cachedCards: Card[] | undefined = myCache.get(`cards_${lang}`);
  if (cachedCards) {
    const card = cachedCards.find((card) => card.card_id === Number(id));
    if (card) {
      res.send(card);
    } else {
      res.status(404).send("Card not found");
    }
  } else {
    res.status(404).send("Cards not found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Initializing...`);
  useInit()
    .then(() => {
      console.log(`[server]: Initialization complete`);
      console.log(`[server]: Server is running at http://localhost:${port}`);
    })
    .catch((error) => {
      console.log(error);
    });
});