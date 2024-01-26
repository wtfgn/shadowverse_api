import axios from "axios";
import type { APIResponseData } from "../types";
import { Card } from "../classes/Card";
import type { LanguageCode } from "../types";

const baseUrl = process.env.BASE_URL || 'https://shadowverse-portal.com/api/v1/cards?format=json';

export const useFetchCards = async (lang: LanguageCode) => {  
  try {
    console.log(`Fetching cards from API... lang=${lang}`);
    const { data } = await axios.get<APIResponseData>(baseUrl, {
      params: {
        lang,
      }
    });
    return Card.transformCards(data.data.cards);
  } catch (error) {
    console.log(error);
  }
};