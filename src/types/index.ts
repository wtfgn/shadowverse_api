export interface APIResponseData {
  data_headers: {
    uuid: boolean,
    viewer_id: number,
    sid: string,
    servertime: number,
    result_code: number,
  },
  data: {
    cards: [RawCard]
  }
}

export interface RawCard {
  card_id: number,
  foil_card_id: number,
  card_set_id: number,
  card_name: null | string,
  card_name_ruby: string,
  is_foil: number,
  char_type: number,
  clan: number,
  tribe_name: string,
  skill: string,
  skill_condition: string,
  skill_target: string,
  skill_option: string,
  skill_preprocess: string,
  skill_disc: string,
  org_skill_disc: string,
  evo_skill_disc: string,
  org_evo_skill_disc: string,
  cost: number,
  atk: number,
  life: number,
  evo_atk: number,
  evo_life: number,
  rarity: number,
  get_red_ether: number,
  use_red_ether: number,
  description: string,
  evo_description: string,
  cv: string,
  copyright: null,
  base_card_id: number,
  normal_card_id: number,
  format_type: number,
  restricted_count: number,
  restricted_count_co_main: number,
  restricted_count_co_sub: number,
  resurgent_card: number
}

export type LanguageCode = "en" | "ja" | "zh-tw";
export interface Clan {
  0: "Forestcraft",
  1: "Swordcraft",
  2: "Runecraft",
  3: "Dragoncraft",
  4: "Shadowcraft",
  5: "Bloodcraft",
  6: "Havencraft",
  7: "Portalcraft",
}
export interface CharType {
  1: "Follower",
  2: "Amulet",
  3: "Amulet (Countdown)",
  4: "Spell",
}

export interface TribeName {
  1: "-";
  2: "Officer";
  3: "Commander";
}

export type Cost = number;
export type Atk = number;
export type Life = number;

export interface Rarity {
  1: "Bronze",
  2: "Silver",
  3: "Gold",
  4: "Legendary",
}