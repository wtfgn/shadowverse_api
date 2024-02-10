"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Card_1 = require("../classes/Card");
const CustomError_1 = require("../classes/CustomError");
const cache_1 = require("../cache");
const query_validator_1 = require("../utils/validators/query_validator");
const axios_1 = require("axios");
const useFetchCards_1 = require("../composables/useFetchCards");
const Deck_1 = require("../classes/Deck");
dotenv_1.default.config();
exports.router = express_1.default.Router();
const validateQuery = (req, res, next) => {
    try {
        (0, query_validator_1.queryValidator)(req.query);
        next();
    }
    catch (error) {
        console.log(error);
        next(new CustomError_1.CustomError(error.message, axios_1.HttpStatusCode.BadRequest));
    }
};
// Called for every request
exports.router.use((req, res, next) => {
    console.log(`[server]: ${req.method} ${req.url} at ${new Date().toLocaleString()}`);
    next();
});
exports.router.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.router.get("/cards", validateQuery, (req, res, next) => {
    const { lang: languageCode = "en" } = req.query;
    const cachedCards = cache_1.myCache.get(`cards_${languageCode}`);
    if (cachedCards) {
        const filteredCards = Card_1.Card.filterByQuery(cachedCards, req.query);
        console.log(`[server]: Sending ${filteredCards.length} cards from cache`);
        res.send(filteredCards);
    }
    else {
        console.log(`[server]: Cards not found in cache`);
        (0, useFetchCards_1.useFetchCards)(languageCode)
            .then((cards) => {
            console.log(`[server]: Sending ${cards.length} cards from API`);
            cache_1.myCache.set(`cards_${languageCode}`, cards);
            res.send(cards);
        })
            .catch((error) => {
            console.error(`[server]: Error fetching cards: ${error.message}`);
            next(new CustomError_1.CustomError(error.message, axios_1.HttpStatusCode.InternalServerError));
        });
    }
});
exports.router.get("/cards/names", (req, res, next) => {
    const { lang: languageCode = "en" } = req.query;
    const cachedCards = cache_1.myCache.get(`cards_${languageCode}`);
    if (cachedCards) {
        const cardNames = Card_1.Card.getCardNames(cachedCards);
        console.log(`[server]: Sending ${cardNames.length} card names from cache`);
        res.send(cardNames);
    }
    else {
        console.log(`[server]: Cards not found in cache`);
        next(new CustomError_1.CustomError("Cards not found", axios_1.HttpStatusCode.NotFound));
    }
});
exports.router.get("/cards/:id", (req, res, next) => {
    const { id } = req.params;
    const { lang: languageCode = "en" } = req.query;
    const cachedCards = cache_1.myCache.get(`cards_${languageCode}`);
    if (cachedCards) {
        console.log(`[server]: Fetching card ${id} from cache`);
        const card = Card_1.Card.selectByCardId(cachedCards, id);
        if (card) {
            console.log(`[server]: Sending card ${id} from cache`);
            res.send(card);
        }
        else {
            next(new CustomError_1.CustomError("Card not found", axios_1.HttpStatusCode.NotFound));
        }
    }
    else {
        console.log(`[server]: Cards not found in cache`);
        next(new CustomError_1.CustomError("Cards not found", axios_1.HttpStatusCode.NotFound));
    }
});
exports.router.get("/deckhash/:deckHash", (req, res, next) => {
    const { deckHash } = req.params;
    const { lang: languageCode = "en" } = req.query;
    try {
        Deck_1.Deck.create(deckHash, languageCode)
            .then((deck) => {
            res.send({
                craftId: deck.getCraftId(),
                cards: deck.getCardsInDeck()
            });
        })
            .catch((error) => {
            next(new CustomError_1.CustomError(error.message, axios_1.HttpStatusCode.BadRequest));
        });
    }
    catch (error) {
        next(new CustomError_1.CustomError(error.message, axios_1.HttpStatusCode.BadRequest));
    }
});
// Called if and only if a middleware calls next(error)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.router.use((err, req, res, _next) => {
    console.error(err.message);
    res.status(err.status || axios_1.HttpStatusCode.InternalServerError);
    res.send(err.message);
});
// Last middleware called, if all others invoke next() and do not respond
exports.router.use((req, res) => {
    res.status(404).send("Not founda");
});
//# sourceMappingURL=api.js.map