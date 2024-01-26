import type { LanguageCode } from "../../types";

export const isLanguageCode = (lang: string): lang is LanguageCode => {
  return ["en", "ja", "zh-tw"].includes(lang);
}