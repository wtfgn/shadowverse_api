import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Card } from "../classes/Card";
import { CustomError } from "../classes/CustomError";
import { myCache } from "../cache";
import { queryValidator } from "../utils/validators/query_validator";
import type { Query } from "../utils/validators/query_validator";
import { HttpStatusCode } from "axios";
import { useFetchCards } from "../composables/useFetchCards";
import { Deck } from "../classes/Deck";
import axios from "axios";

dotenv.config();

export const router = express.Router();

const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  try {
    queryValidator(req.query as Query);
    next()
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, HttpStatusCode.BadRequest));
  }
}

// Called for every request
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[server]: ${req.method} ${req.url} at ${new Date().toLocaleString()}`);
  next();
});

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.get("/cards", validateQuery, (req: Request, res: Response, next: NextFunction) => {
  const { lang: languageCode = "en" } = req.query as Query;

  const cachedCards: Card[] | undefined = myCache.get(`cards_${languageCode}`);

  if (cachedCards) {
    const filteredCards = Card.filterByQuery(cachedCards, req.query as Query);
    console.log(`[server]: Sending ${filteredCards.length} cards from cache`);
    res.send(filteredCards);
  }
  else {
    console.log(`[server]: Cards not found in cache`);
    useFetchCards(languageCode)
      .then((cards) => {
        console.log(`[server]: Sending ${cards.length} cards from API`);
        myCache.set(`cards_${languageCode}`, cards);
        res.send(Card.filterByQuery(cards, req.query as Query));
      })
      .catch((error) => {
        console.error(`[server]: Error fetching cards: ${(error as Error).message}`);
        next(new CustomError((error as Error).message, HttpStatusCode.InternalServerError));
      });
  }
});

router.get("/cards/names", (req: Request, res: Response, next: NextFunction) => {
  const { lang: languageCode = "en" } = req.query as Query;

  const cachedCards: Card[] | undefined = myCache.get(`cards_${languageCode}`);
  if (cachedCards) {
    const cardNames = Card.getCardNames(cachedCards);
    console.log(`[server]: Sending ${cardNames.length} card names from cache`);
    res.send(cardNames);
  }
  else {
    console.log(`[server]: Cards not found in cache`);
    next(new CustomError("Cards not found", HttpStatusCode.NotFound));
  }
});

router.get("/cards/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { lang: languageCode = "en" } = req.query as Query;

  const cachedCards: Card[] | undefined = myCache.get(`cards_${languageCode}`);
  if (cachedCards) {
    console.log(`[server]: Fetching card ${id} from cache`);
    const card = Card.selectByCardId(cachedCards, id);
    if (card) {
      console.log(`[server]: Sending card ${id} from cache`);
      res.send(card);
    } else {
      next(new CustomError("Card not found", HttpStatusCode.NotFound));
    }
  }
  else {
    console.log(`[server]: Cards not found in cache`);
    next(new CustomError("Cards not found", HttpStatusCode.NotFound));
  }
});

router.get("/deckhash/:deckHash", (req: Request, res: Response, next: NextFunction) => {
  const { deckHash } = req.params;
  const { lang: languageCode = "en" } = req.query as Query;

  Deck.create(deckHash, languageCode)
    .then((deck) => {
      res.send({
        craftId: deck.getCraftId(),
        deck: deck.getCardsInDeck(),
        deckSize: deck.getDeckSize(),
      });
    })
    .catch((error) => {
      next(new CustomError((error as Error).message, HttpStatusCode.BadRequest));
    });
});

router.get("/deckcode/publish", (req: Request, res: Response, next: NextFunction) => {
  const { lang: languageCode = "en" } = req.query as Query;
  const query = req.query;
  const deckHash = query.deckHash as string;
  const publishDeckUrl = 'https://shadowverse-portal.com/api/v1/deck_code/publish?format=json';

  const formData = new FormData();
  let deckCode = '';
  // Add hash to form data
  formData.append('hash', deckHash);
  formData.append('csrf_token', '');
  axios.post(publishDeckUrl, formData, {
    params: {
      lang: languageCode,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((officialApiRes) => {
      const { data: customData } = officialApiRes.data as { data: { deck_code: string } };
      deckCode = customData.deck_code;
      if (deckCode === '' || deckCode === undefined) {
        throw new Error('Deck code not found');
      }
      res.send({
        deckCode,
      });
    })
    .catch((err) => {
      next(new CustomError((err as Error).message, HttpStatusCode.BadRequest));
    });
});

// Called if and only if a middleware calls next(error)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: CustomError, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.status(err.status || HttpStatusCode.InternalServerError);
  res.send(err.message);
});

// Last middleware called, if all others invoke next() and do not respond
router.use((req: Request, res: Response) => {
  res.status(404).send("Not founda");
});



