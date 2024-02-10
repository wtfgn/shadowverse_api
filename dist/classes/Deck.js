"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const Card_1 = require("./Card");
const cache_1 = require("../cache");
const useFetchCards_1 = require("../composables/useFetchCards");
class Deck {
    constructor(deckHash, languageCode) {
        this.craftId = -1;
        this.cards = [];
        const { craftId, newDeck } = Deck.parseDeckHash(deckHash);
        this.craftId = craftId;
        this.cards = this.transformDeck(newDeck, languageCode);
    }
    static parseDeckHash(deckHash) {
        if (!/\d\.\d\./.test(deckHash.substring(0, 4)))
            throw new Error('Invalid deck hash');
        const craftIdString = deckHash.substring(2, 3);
        const hashes = deckHash.substring(4).split('.');
        const newDeck = {};
        let count = 0;
        hashes.forEach((hash) => {
            let cardId = 0;
            hash = hash.split('').reverse().join('');
            for (let i = 0; i < hash.length; i++)
                cardId += Deck.RADIX.indexOf(hash.charAt(i)) * Math.pow(64, i);
            if (newDeck[cardId])
                newDeck[cardId] += 1;
            else
                newDeck[cardId] = 1;
            count += 1;
        });
        const craftId = Number.parseInt(craftIdString, 10);
        return { craftId, newDeck, count };
    }
    transformDeck(simpleDeck, languageCode) {
        let cachedCards = cache_1.myCache.get(`cards_${languageCode}`);
        if (!cachedCards) {
            console.log(`[server]: Cards not found in cache when transforming deck`);
            (0, useFetchCards_1.useFetchCards)(languageCode)
                .then((cards) => {
                console.log(`[server]: Sending ${cards.length} cards from API`);
                cache_1.myCache.set(`cards_${languageCode}`, cards);
                cachedCards = cards;
            })
                .catch((error) => {
                console.error(`[server]: Error fetching cards: ${error.message}`);
                throw error;
            });
        }
        return Object.entries(simpleDeck).map(([cardId, count]) => {
            const card = Card_1.Card.selectByCardId(cachedCards, cardId);
            if (!card)
                throw new Error(`Card not found: ${cardId} when transforming deck`);
            return Object.assign(Object.assign({}, card), { count });
        });
    }
    getCraftId() {
        return this.craftId;
    }
    getCardsInDeck() {
        return this.cards;
    }
}
exports.Deck = Deck;
Deck.RADIX = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
Deck.MAX_SIZE = 40;
//# sourceMappingURL=Deck.js.map