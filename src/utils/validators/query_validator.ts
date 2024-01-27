import type { LanguageCode } from "../../types";
import type { ParsedQs } from "qs";

export interface Query {
  clan?: string | string[];
  char_type?: string | string[];
  [key: string]: string | string[] | undefined;
}

export const isValidLanguageCode = (lang: string | ParsedQs | string[] | ParsedQs[] | undefined): lang is LanguageCode => {
  if (typeof lang !== "string") return false;
  return ["en", "ja", "zh-tw"].includes(lang);
}

export const isValidClanCode = (clan:  string | string[] | undefined): boolean => {
  if (Array.isArray(clan)) {
    return clan.every(code => typeof code === "string" && isValidClanCode(code));
  } else if (typeof clan === "string") {
    return clan >= "0" && clan <= "7";
  }
  return false;
}

export const isValidCharTypeCode = (charType:  string | string[] | undefined): boolean => {
  if (Array.isArray(charType)) {
    return charType.every(code => typeof code === "string" && isValidCharTypeCode(code));
  } else if (typeof charType === "string") {
    return charType >= "1" && charType <= "4";
  }
  return false;
}

export const isValidQuery = (query: Query): boolean => {
  return (query.clan === undefined || isValidClanCode(query.clan)) &&
    (query.char_type === undefined || isValidCharTypeCode(query.char_type));
}