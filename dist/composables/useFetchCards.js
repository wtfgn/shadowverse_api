"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchCards = void 0;
const axios_1 = __importDefault(require("axios"));
const Card_1 = require("../classes/Card");
const query_validator_1 = require("../utils/validators/query_validator");
const baseUrl = process.env.BASE_URL || 'https://shadowverse-portal.com/api/v1/cards?format=json';
const useFetchCards = (lang = "en") => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, query_validator_1.isValidLanguageCode)(lang)) {
        console.error(`Invalid language code: ${lang}. Defaulting to 'en'.`);
        lang = "en";
    }
    console.log(`[server]: Fetching cards from API... lang=${lang}`);
    try {
        const { data: { data: { cards: cardsData } } } = yield axios_1.default.get(baseUrl, {
            params: { lang },
        });
        return Card_1.Card.transformCards(cardsData);
    }
    catch (error) {
        console.error(`[server]: Error fetching cards: ${error.message}`);
        throw error;
    }
});
exports.useFetchCards = useFetchCards;
