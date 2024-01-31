import type { LanguageCode, RawCard } from '../types';
import { myCache } from '../cache';
import type { Query } from '../utils/validators/query_validator';
import {
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

  static selectByCardSetId(cards: Card[], cardSetId: string | string[]): Card[] {
    if (Array.isArray(cardSetId)) {
      const cardSetIds = cardSetId.map(Number);
      return cards.filter(card => cardSetIds.includes(card.card_set_id));
    }
    return cards.filter(card => card.card_set_id === Number(cardSetId));
  }

  static selectByClan(cards: Card[], clanCode: string | string[]): Card[] {
    if (Array.isArray(clanCode)) {
      const clanCodes = clanCode.map(Number);
      return cards.filter(card => clanCodes.includes(card.clan));
    }
    return cards.filter(card => card.clan === Number(clanCode));
  }

  static selectByCharType(cards: Card[], charTypeCode: string | string[]): Card[] {
    if (Array.isArray(charTypeCode)) {
      const charTypeCodes = charTypeCode.map(Number);
      return cards.filter(card => charTypeCodes.includes(card.char_type));
    }
    return cards.filter(card => card.char_type === Number(charTypeCode));
  }

  static selectByTribeName(cards: Card[], tribeNameCode: string | string[], languageCode: LanguageCode = "en"): Card[] {
    if (Array.isArray(tribeNameCode)) {
      const tribeNames = tribeNameCode.map(code => TribeName[languageCode][Number(code)]);
      return cards.filter(card => tribeNames.includes(card.tribe_name));
    }
    return cards.filter(card => card.tribe_name === TribeName[languageCode][Number(tribeNameCode)]);
  }

  static selectByCost(cards: Card[], cost: string | string[]): Card[] {
    if (Array.isArray(cost)) {
      const costs = cost.map(Number);
      return cards.filter(card => costs.includes(card.cost));
    }
    return cards.filter(card => card.cost === Number(cost));
  }

  static selectByAtk(cards: Card[], atk: string | string[]): Card[] {
    if (Array.isArray(atk)) {
      const atks = atk.map(Number);
      return cards.filter(card => atks.includes(card.atk));
    }
    return cards.filter(card => card.atk === Number(atk));
  }

  static selectByLife(cards: Card[], life: string | string[]): Card[] {
    if (Array.isArray(life)) {
      const lifes = life.map(Number);
      return cards.filter(card => lifes.includes(card.life));
    }
    return cards.filter(card => card.life === Number(life));
  }

  static selectByRarity(cards: Card[], rarityCode: string | string[]): Card[] {
    if (Array.isArray(rarityCode)) {
      const rarities = rarityCode.map(Number);
      return cards.filter(card => rarities.includes(card.rarity));
    }
    return cards.filter(card => card.rarity === Number(rarityCode));
  }

  static selectByGetRedEther(cards: Card[], getRedEtherNum: string | string[]): Card[] {
    if (Array.isArray(getRedEtherNum)) {
      const getRedEthers = getRedEtherNum.map(Number);
      return cards.filter(card => getRedEthers.includes(card.get_red_ether));
    }
    return cards.filter(card => card.get_red_ether === Number(getRedEtherNum));
  }

  static selectByUseRedEther(cards: Card[], useRedEtherNum: string | string[]): Card[] {
    if (Array.isArray(useRedEtherNum)) {
      const useRedEthers = useRedEtherNum.map(Number);
      return cards.filter(card => useRedEthers.includes(card.use_red_ether));
    }
    return cards.filter(card => card.use_red_ether === Number(useRedEtherNum));
  }

  static selectByFormatType(cards: Card[], formatTypeCode: string | string[]): Card[] {
    if (Array.isArray(formatTypeCode)) {
      const formatTypes = formatTypeCode.map(Number);
      return cards.filter(card => formatTypes.includes(card.format_type));
    }
    return cards.filter(card => card.format_type === Number(formatTypeCode));
  }

  static selectByRestrictedCount(cards: Card[], restrictedCount: string | string[]): Card[] {
    if (Array.isArray(restrictedCount)) {
      const restrictedCounts = restrictedCount.map(Number);
      return cards.filter(card => restrictedCounts.includes(card.restricted_count));
    }
    return cards.filter(card => card.restricted_count === Number(restrictedCount));
  }

  static selectByRestrictedCountCoMain(cards: Card[], restrictedCountCoMain: string | string[]): Card[] {
    if (Array.isArray(restrictedCountCoMain)) {
      const restrictedCountCoMains = restrictedCountCoMain.map(Number);
      return cards.filter(card => restrictedCountCoMains.includes(card.restricted_count_co_main));
    }
    return cards.filter(card => card.restricted_count_co_main === Number(restrictedCountCoMain));
  }

  static selectByRestrictedCountCoSub(cards: Card[], restrictedCountCoSub: string | string[]): Card[] {
    if (Array.isArray(restrictedCountCoSub)) {
      const restrictedCountCoSubs = restrictedCountCoSub.map(Number);
      return cards.filter(card => restrictedCountCoSubs.includes(card.restricted_count_co_sub));
    }
    return cards.filter(card => card.restricted_count_co_sub === Number(restrictedCountCoSub));
  }

  static selectByResurgentCard(cards: Card[], resurgentCardCode: string | string[]): Card[] {
    if (Array.isArray(resurgentCardCode)) {
      const resurgentCards = resurgentCardCode.map(Number);
      return cards.filter(card => resurgentCards.includes(card.resurgent_card));
    }
    return cards.filter(card => card.resurgent_card === Number(resurgentCardCode));
  }

  static filterByQuery(cards: Card[], query: Query): Card[] {
    let filteredCards = cards;
    const {
      lang: languageCode,
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

    if (cardSetId !== undefined && isValidCardSetCode(cardSetId)) {
      filteredCards = Card.selectByCardSetId(filteredCards, cardSetId);
    }
    if (clanCode !== undefined && isValidClanCode(clanCode)) {
      filteredCards = Card.selectByClan(filteredCards, clanCode);
    }
    if (charTypeCode !== undefined && isValidCharTypeCode(charTypeCode)) {
      filteredCards = Card.selectByCharType(filteredCards, charTypeCode);
    }
    if (tribeNameCode !== undefined && isValidTribeNameCode(tribeNameCode)) {
      filteredCards = Card.selectByTribeName(filteredCards, tribeNameCode, languageCode);
    }
    if (costValue !== undefined && isValidCost(costValue)) {
      filteredCards = Card.selectByCost(filteredCards, costValue);
    }
    if (atkValue !== undefined && isValidAtk(atkValue)) {
      filteredCards = Card.selectByAtk(filteredCards, atkValue);
    }
    if (lifeValue !== undefined && isValidLife(lifeValue)) {
      filteredCards = Card.selectByLife(filteredCards, lifeValue);
    }
    if (rarityCode !== undefined && isValidRarity(rarityCode)) {
      filteredCards = Card.selectByRarity(filteredCards, rarityCode);
    }
    if (getRedEtherNum !== undefined && isValidGetRedEther(getRedEtherNum)) {
      filteredCards = Card.selectByGetRedEther(filteredCards, getRedEtherNum);
    }
    if (useRedEtherNum !== undefined && isValidUseRedEther(useRedEtherNum)) {
      filteredCards = Card.selectByUseRedEther(filteredCards, useRedEtherNum);
    }
    if (formatTypeCode !== undefined && isValidFormatType(formatTypeCode)) {
      filteredCards = Card.selectByFormatType(filteredCards, formatTypeCode);
    }
    if (restrictedCount !== undefined && isValidRestrictedCount(restrictedCount)) {
      filteredCards = Card.selectByRestrictedCount(filteredCards, restrictedCount);
    }
    if (restrictedCountCoMain !== undefined && isValidRestrictedCountCoMain(restrictedCountCoMain)) {
      filteredCards = Card.selectByRestrictedCountCoMain(filteredCards, restrictedCountCoMain);
    }
    if (restrictedCountCoSub !== undefined && isValidRestrictedCountCoSub(restrictedCountCoSub)) {
      filteredCards = Card.selectByRestrictedCountCoSub(filteredCards, restrictedCountCoSub);
    }
    if (resurgentCardCode !== undefined && isValidResurgentCard(resurgentCardCode)) {
      filteredCards = Card.selectByResurgentCard(filteredCards, resurgentCardCode);
    }
    
    return filteredCards;
  }

}