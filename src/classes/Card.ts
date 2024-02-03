import type { LanguageCode, RawCard } from '../types';
import { myCache } from '../cache';
import type { Query } from '../utils/validators/query_validator';
import {
  isValidCardName,
  isValidCardSetCode,
  isValidClanCode,
  isValidCharTypeCode,
  isValidTribeNameCode,
  isValidCost,
  isValidAtk,
  isValidLife,
  isValidRarity,
  isValidGetRedEther,
  isValidUseRedEther,
  isValidFormatType,
  isValidRestrictedCount,
  isValidRestrictedCountCoMain,
  isValidRestrictedCountCoSub,
  isValidResurgentCard,
} from '../utils/validators/query_validator';
import { TribeName } from '../types';

export class Card {
  card_id: number;
  card_set_id: number;
  card_name: null | string;
  char_type: number;
  clan: number;
  tribe_name: string;
  skill: string;
  skill_disc: string;
  org_skill_disc: string;
  evo_skill_disc: string;
  org_evo_skill_disc: string;
  cost: number;
  atk: number;
  life: number;
  evo_atk: number;
  evo_life: number;
  rarity: number;
  get_red_ether: number;
  use_red_ether: number;
  description: string;
  evo_description: string;
  cv: string;
  base_card_id: number;
  format_type: number;
  restricted_count: number;
  restricted_count_co_main: number;
  restricted_count_co_sub: number;
  resurgent_card: number

  constructor(rawCard: RawCard) {
    this.card_id = rawCard.card_id;
    this.card_set_id = rawCard.card_set_id;
    this.card_name = rawCard.card_name;
    this.char_type = rawCard.char_type;
    this.clan = rawCard.clan;
    this.tribe_name = rawCard.tribe_name;
    this.skill = rawCard.skill;
    this.skill_disc = rawCard.skill_disc;
    this.org_skill_disc = rawCard.org_skill_disc;
    this.evo_skill_disc = rawCard.evo_skill_disc;
    this.org_evo_skill_disc = rawCard.org_evo_skill_disc;
    this.cost = rawCard.cost;
    this.atk = rawCard.atk;
    this.life = rawCard.life;
    this.evo_atk = rawCard.evo_atk;
    this.evo_life = rawCard.evo_life;
    this.rarity = rawCard.rarity;
    this.get_red_ether = rawCard.get_red_ether;
    this.use_red_ether = rawCard.use_red_ether;
    this.description = rawCard.description;
    this.evo_description = rawCard.evo_description;
    this.cv = rawCard.cv;
    this.base_card_id = rawCard.base_card_id;
    this.format_type = rawCard.format_type;
    this.restricted_count = rawCard.restricted_count;
    this.restricted_count_co_main = rawCard.restricted_count_co_main;
    this.restricted_count_co_sub = rawCard.restricted_count_co_sub;
    this.resurgent_card = rawCard.resurgent_card;
  }

  static transformCards(rawCards: RawCard[]): Card[] {
    const cachedCardsJa: Card[] | undefined = myCache.get(`cards_ja`);
    return rawCards.map(rawCard => {
      if (!rawCard.cv || rawCard.cv === "") {
        const cachedCard = Card.selectByCardId(cachedCardsJa!, rawCard.card_id);
        if (cachedCard) {
          rawCard.cv = cachedCard.cv;
        }
      }

      return new Card(rawCard);
    });
  }

  static selectByCardId(cards: Card[], cardId: string | number): Card | undefined {
    return cards.find(card => card.card_id === Number(cardId));
  }

  static selectByProperty(cards: Card[], property: string | string[], propertyName: keyof Card): Card[] {
    if (Array.isArray(property)) {
      const properties = property.map(Number);
      return cards.filter(card => properties.includes(Number(card[propertyName])));
    }
    return cards.filter(card => card[propertyName] === Number(property));
  }

  static selectByTribeName(cards: Card[], tribeNameCode: string | string[], languageCode: LanguageCode = "en"): Card[] {
    if (Array.isArray(tribeNameCode)) {
      const tribeNames = tribeNameCode.map(code => TribeName[languageCode][Number(code)]);
      return cards.filter(card => tribeNames.includes(card.tribe_name));
    }
    return cards.filter(card => card.tribe_name === TribeName[languageCode][Number(tribeNameCode)]);
  }

  static getCardNames(cards: Card[]): string[] {
    // ignore names with null
    return cards.filter(card => card.card_name !== null).map(card => card.card_name!);
  }

  static filterByQuery(cards: Card[], query: Query): Card[] {
    let filteredCards = cards;
    const {
      lang: languageCode,
      card_name: cardName,
      card_set_id: cardSetId,
      clan: clanCode,
      char_type: charTypeCode,
      tribe_name: tribeNameCode,
      cost: costValue, 
      atk: atkValue,
      life: lifeValue,
      rarity: rarityCode,
      get_red_ether: getRedEtherNum,
      use_red_ether: useRedEtherNum,
      format_type: formatTypeCode,
      restricted_count: restrictedCount,
      restricted_count_co_main: restrictedCountCoMain,
      restricted_count_co_sub: restrictedCountCoSub,
      resurgent_card: resurgentCardCode,
    } = query;

    // Discard cards with no name
    filteredCards = filteredCards.filter(card => card.card_name !== null);

    // Filter by query
    if (cardName !== undefined && isValidCardName(cardName)) {
      filteredCards = filteredCards.filter(card => card.card_name!.toLowerCase().includes(cardName.toLowerCase()));
    }
    if (cardSetId !== undefined && isValidCardSetCode(cardSetId)) {
      filteredCards = Card.selectByProperty(filteredCards, cardSetId, "card_set_id");
    }
    if (clanCode !== undefined && isValidClanCode(clanCode)) {
      filteredCards = Card.selectByProperty(filteredCards, clanCode, "clan");
    }
    if (charTypeCode !== undefined && isValidCharTypeCode(charTypeCode)) {
      filteredCards = Card.selectByProperty(filteredCards, charTypeCode, "char_type");
    }
    if (tribeNameCode !== undefined && isValidTribeNameCode(tribeNameCode)) {
      filteredCards = Card.selectByTribeName(filteredCards, tribeNameCode, languageCode);
    }
    if (costValue !== undefined && isValidCost(costValue)) {
      filteredCards = Card.selectByProperty(filteredCards, costValue, "cost");
    }
    if (atkValue !== undefined && isValidAtk(atkValue)) {
      filteredCards = Card.selectByProperty(filteredCards, atkValue, "atk");
    }
    if (lifeValue !== undefined && isValidLife(lifeValue)) {
      filteredCards = Card.selectByProperty(filteredCards, lifeValue, "life");
    }
    if (rarityCode !== undefined && isValidRarity(rarityCode)) {
      filteredCards = Card.selectByProperty(filteredCards, rarityCode, "rarity");
    }
    if (getRedEtherNum !== undefined && isValidGetRedEther(getRedEtherNum)) {
      filteredCards = Card.selectByProperty(filteredCards, getRedEtherNum, "get_red_ether");
    }
    if (useRedEtherNum !== undefined && isValidUseRedEther(useRedEtherNum)) {
      filteredCards = Card.selectByProperty(filteredCards, useRedEtherNum, "use_red_ether");
    }
    if (formatTypeCode !== undefined && isValidFormatType(formatTypeCode)) {
      filteredCards = Card.selectByProperty(filteredCards, formatTypeCode, "format_type");
    }
    if (restrictedCount !== undefined && isValidRestrictedCount(restrictedCount)) {
      filteredCards = Card.selectByProperty(filteredCards, restrictedCount, "restricted_count");
    }
    if (restrictedCountCoMain !== undefined && isValidRestrictedCountCoMain(restrictedCountCoMain)) {
      filteredCards = Card.selectByProperty(filteredCards, restrictedCountCoMain, "restricted_count_co_main");
    }
    if (restrictedCountCoSub !== undefined && isValidRestrictedCountCoSub(restrictedCountCoSub)) {
      filteredCards = Card.selectByProperty(filteredCards, restrictedCountCoSub, "restricted_count_co_sub");
    }
    if (resurgentCardCode !== undefined && isValidResurgentCard(resurgentCardCode)) {
      filteredCards = Card.selectByProperty(filteredCards, resurgentCardCode, "resurgent_card");
    }
    
    return filteredCards;
  }

}