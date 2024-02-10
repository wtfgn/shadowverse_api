import { Card } from './Card';
import { myCache } from '../cache';
import { LanguageCode } from 'index';
import { useFetchCards } from '../composables/useFetchCards';

export type CardInDeck = Card & { count: number }
export type SimpleDeck = { [card_id: string]: number }

export class Deck {
  static readonly RADIX = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
  static readonly MAX_SIZE = 40;

  private craftId: number = -1;
  private cards: CardInDeck[] = [];

  constructor(deckHash: string, languageCode: LanguageCode) {
    const { craftId, newDeck } = Deck.parseDeckHash(deckHash);
    this.craftId = craftId;
    this.cards = this.transformDeck(newDeck, languageCode);
  }


  static parseDeckHash(deckHash: string) {
    if (!/\d\.\d\./.test(deckHash.substring(0, 4)))
      throw new Error('Invalid deck hash');

    const craftIdString = deckHash.substring(2, 3);
    const hashes = deckHash.substring(4).split('.');
    const newDeck: SimpleDeck = {}
    let count = 0;

    hashes.forEach((hash) => {
      let cardId: number = 0;

      hash = hash.split('').reverse().join('');
      for (let i = 0; i < hash.length; i++)
        cardId += Deck.RADIX.indexOf(hash.charAt(i)) * 64 ** i;

      if (newDeck[cardId])
        newDeck[cardId] += 1;
      else
        newDeck[cardId] = 1;

      count += 1;
    });

    const craftId = Number.parseInt(craftIdString, 10);

    return { craftId, newDeck, count };
  }

  private transformDeck(simpleDeck: SimpleDeck, languageCode: LanguageCode): CardInDeck[] {
    let cachedCards: Card[] | undefined = myCache.get(`cards_${languageCode}`);
    if (!cachedCards) {
      console.log(`[server]: Cards not found in cache when transforming deck`);
      useFetchCards(languageCode)
        .then((cards) => {
          console.log(`[server]: Sending ${cards.length} cards from API`);
          myCache.set(`cards_${languageCode}`, cards);
          cachedCards = cards;
        })
        .catch((error) => {
          console.error(`[server]: Error fetching cards: ${(error as Error).message}`);
          throw error;
        });
    }

    return Object.entries(simpleDeck).map(([cardId, count]) => {
      const card = Card.selectByCardId(cachedCards, cardId);
      if (!card)
        throw new Error(`Card not found: ${cardId} when transforming deck`);
      return { ...card, count };
    });
  }


    getCraftId() {
      return this.craftId;
    }

    getCardsInDeck() {
      return this.cards;
    }
  }