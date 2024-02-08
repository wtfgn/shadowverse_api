import axios from "axios";
import type { APIResponseData } from "../types";
import { Card } from "../classes/Card";
import { isValidLanguageCode } from "../utils/validators/query_validator";
import type { LanguageCode } from "../types";

const baseUrl = process.env.BASE_URL || 'https://shadowverse-portal.com/api/v1/cards?format=json';

export const useFetchCards = async (lang: LanguageCode = "en"): Promise<Card[]> => {
  if (!isValidLanguageCode(lang)) {
    console.error(`Invalid language code: ${lang}. Defaulting to 'en'.`);
    lang = "en";
  }

  console.log(`[server]: Fetching cards from API... lang=${lang}`);

  try {
    const { data: { data: { cards: cardsData } } } = await axios.get<APIResponseData>(baseUrl, {
      params: { lang },
    });

    return Card.transformCards(cardsData);
  } catch (error) {
    console.error(`[server]: Error fetching cards: ${(error as Error).message}`);
    throw error;
  }
};