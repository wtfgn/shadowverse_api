import type { LanguageCode } from "../../types";

export interface Query {
  lang?: LanguageCode;
  card_name?: string;
  clan?: string | string[];
  char_type?: string | string[];
  tribe_name?: string | string[];
  cost?: string | string[];
  atk?: string | string[];
  life?: string | string[];
  rarity?: string | string[];
  get_red_ether?: string | string[];
  use_red_ether?: string | string[];
  format_type?: string | string[];
  restricted_count?: string | string[];
  restricted_count_co_main?: string | string[];
  restricted_count_co_sub?: string | string[];
  resurgent_card?: string | string[];
  card_set_id?: string | string[];
  [key: string]: string | string[] | undefined;
}

export const isValidLanguageCode = (lang: string | undefined): boolean => {
  return ["en", "ja", "zh-tw"].includes(lang || "");
}

const isValidCode = (code: string | string[] | undefined, predicate: (code: string) => boolean): boolean => {
  if (Array.isArray(code)) {
    return code.every(c => isValidCode(c, predicate));
  } else if (typeof code === "string") {
    return predicate(code);
  }
  return false;
}

// Utility function to check if a string is a number in a given range
const isNumberInRange = (min: number, max: number) => (code: string) => {
  const num = Number(code);
  return !isNaN(num) && num >= min && num <= max;
}

// Utility function to check if the code is a number
const isNumericCode = (code: string | string[] | undefined): boolean => {
  return isValidCode(code, (code: string) => !isNaN(Number(code)))
}

export const isValidCardName = (cardName: string | undefined): boolean => {
  return typeof cardName === "string" && cardName.length > 0;
}

export const isValidCardSetCode = isNumericCode;

export const isValidClanCode = (clan: string | string[] | undefined): boolean => {
  return isValidCode(clan, isNumberInRange(0, 8));
}

export const isValidCharTypeCode = (charType: string | string[] | undefined): boolean => {
  return isValidCode(charType, isNumberInRange(1, 4));
}

export const isValidTribeNameCode = (tribeName: string | string[] | undefined): boolean => {
  return isValidCode(tribeName, isNumberInRange(0, 36));
}

export const isValidCost = isNumericCode;
export const isValidAtk = isNumericCode;
export const isValidLife = isNumericCode;

export const isValidRarity = (rarity: string | string[] | undefined): boolean => {
  return isValidCode(rarity, isNumberInRange(1, 4));
}

export const isValidGetRedEther = isNumericCode;
export const isValidUseRedEther = isNumericCode;

export const isValidFormatType = (formatType: string | string[] | undefined): boolean => {
  return isValidCode(formatType, isNumberInRange(0, 1));
}

export const isValidRestrictedCount = (restrictedCount: string | string[] | undefined): boolean => {
  return isValidCode(restrictedCount, isNumberInRange(0, 3));
}

export const isValidRestrictedCountCoMain = (restrictedCountCoMain: string | string[] | undefined): boolean => {
  return isValidCode(restrictedCountCoMain, isNumberInRange(0, 3));
}

export const isValidRestrictedCountCoSub = (restrictedCountCoSub: string | string[] | undefined): boolean => {
  return isValidCode(restrictedCountCoSub, isNumberInRange(0, 3));
}

export const isValidResurgentCard = (resurgentCard: string | string[] | undefined): boolean => {
  return isValidCode(resurgentCard, isNumberInRange(0, 1));
}

// Check if a query is valid
export const queryValidator = (query: Query): void => {
  // Validate language code
  if (query.lang && !isValidLanguageCode(query.lang)) {
    throw new Error("Invalid language code");
  }

  // Undefined query parameters are valid
  if (Object.keys(query).length === 0) {
    return;
  }

  // Validate other query parameters
  if (query.card_name && !isValidCardName(query.card_name)) {
    throw new Error("Invalid card name");
  }
  if (query.card_set_id && !isValidCardSetCode(query.card_set_id)) {
    throw new Error("Invalid card_set_id");
  }
  if (query.clan && !isValidClanCode(query.clan)) {
    throw new Error("Invalid clan code");
  }
  if (query.char_type && !isValidCharTypeCode(query.char_type)) {
    throw new Error("Invalid char_type code");
  }
  if (query.tribe_name && !isValidTribeNameCode(query.tribe_name)) {
    throw new Error("Invalid tribe_name code");
  }
  if (query.cost && !isValidCost(query.cost)) {
    throw new Error("Invalid cost");
  }
  if (query.atk && !isValidAtk(query.atk)) {
    throw new Error("Invalid atk");
  }
  if (query.life && !isValidLife(query.life)) {
    throw new Error("Invalid life");
  }
  if (query.rarity && !isValidRarity(query.rarity)) {
    throw new Error("Invalid rarity");
  }
  if (query.get_red_ether && !isValidGetRedEther(query.get_red_ether)) {
    throw new Error("Invalid get_red_ether");
  }
  if (query.use_red_ether && !isValidUseRedEther(query.use_red_ether)) {
    throw new Error("Invalid use_red_ether");
  }
  if (query.format_type && !isValidFormatType(query.format_type)) {
    throw new Error("Invalid format_type");
  }
  if (query.restricted_count && !isValidRestrictedCount(query.restricted_count)) {
    throw new Error("Invalid restricted_count");
  }
  if (query.restricted_count_co_main && !isValidRestrictedCountCoMain(query.restricted_count_co_main)) {
    throw new Error("Invalid restricted_count_co_main");
  }
  if (query.restricted_count_co_sub && !isValidRestrictedCountCoSub(query.restricted_count_co_sub)) {
    throw new Error("Invalid restricted_count_co_sub");
  }
  if (query.resurgent_card && !isValidResurgentCard(query.resurgent_card)) {
    throw new Error("Invalid resurgent_card");
  }
}