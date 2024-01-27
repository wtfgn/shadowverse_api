import type { RawCard } from '../types';
import type { Query } from '../utils/validators/query_validator';
import {
  isValidClanCode,
  isValidCharTypeCode
} from '../utils/validators/query_validator';

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
    this.format_type = rawCard.format_type;
    this.restricted_count = rawCard.restricted_count;
    this.restricted_count_co_main = rawCard.restricted_count_co_main;
    this.restricted_count_co_sub = rawCard.restricted_count_co_sub;
    this.resurgent_card = rawCard.resurgent_card;
  }

  static transformCard(rawCard: RawCard): Card {
    return new Card(rawCard);
  }

  static transformCards(rawCards: RawCard[]): Card[] {
    return rawCards.map(rawCard => new Card(rawCard));
  }

  static selectByCardId(cards: Card[], cardId: number): Card | undefined {
    return cards.find(card => card.card_id === cardId);
  }

  static selectByClan(cards: Card[], clanCode: string | string[]): Card[] {
    if (Array.isArray(clanCode)) {
      const clanCodes = clanCode.map(Number); // 
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

  static filterByQuery(cards: Card[], query: Query): Card[] {
    let filteredCards = cards;
    const {
      clan: clanCode,
      char_type: charTypeCode
    } = query;

    if (clanCode !== undefined && isValidClanCode(clanCode)) {
      filteredCards = Card.selectByClan(filteredCards, clanCode);
    }
    if (charTypeCode !== undefined && isValidCharTypeCode(charTypeCode)) {
      filteredCards = Card.selectByCharType(filteredCards, charTypeCode);
    }
    return filteredCards;
  }

}