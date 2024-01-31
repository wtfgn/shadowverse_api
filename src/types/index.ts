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

export const Clan = {
  0: "Forestcraft",
  1: "Swordcraft",
  2: "Runecraft",
  3: "Dragoncraft",
  4: "Shadowcraft",
  5: "Bloodcraft",
  6: "Havencraft",
  7: "Portalcraft",
} as const;

export const CharType = {
  1: "Follower",
  2: "Amulet",
  3: "Amulet (Countdown)",
  4: "Spell",
} as const;

export const TribeName: { [key: string]: { [key: string]: string } } = {
  "en": {
    0: "-",
    1: "Academic",
    2: "All",
    3: "Armed",
    4: "Artifact",
    5: "Chess",
    6: "Cmdr./Acad.",
    7: "Cmdr./Cdmn.",
    8: "Cmdr./Fes.",
    9: "Cmdr./Hero.",
    10: "Cmdr./Lvn.",
    11: "Cmdr./Mach.",
    12: "Cmdr./Nat.",
    13: "Commander",
    14: "Condemned",
    15: "Earth Sigil",
    16: "Festive",
    17: "Heroic",
    18: "Levin",
    19: "Loot",
    20: "Mach./Acad.",
    21: "Mach./Art.",
    22: "Mach./Cdmn.",
    23: "Mach./Fes.",
    24: "Mach./Nat.",
    25: "Machina",
    26: "Mys./Acad.",
    27: "Mysteria",
    28: "Natura",
    29: "Ofcr./Acad.",
    30: "Ofcr./Cdmn.",
    31: "Ofcr./Fes.",
    32: "Ofcr./Hero.",
    33: "Ofcr./Lvn.",
    34: "Ofcr./Mach.",
    35: "Ofcr./Nat.",
    36: "Officer",
  },
  "zh-tw": {
    0: "-",
    1: "學園",
    2: "全部",
    3: "武裝",
    4: "創造物",
    5: "西洋棋",
    6: "指揮官‧學園",
    7: "指揮官‧八獄",
    8: "指揮官‧宴樂",
    9: "指揮官‧英雄",
    10: "指揮官‧雷維翁",
    11: "指揮官‧機械",
    12: "指揮官‧自然",
    13: "指揮官",
    14: "八獄",
    15: "土之印",
    16: "宴樂",
    17: "英雄",
    18: "雷維翁",
    19: "財寶",
    20: "機械‧學園",
    21: "機械‧創造物",
    22: "機械‧八獄",
    23: "機械‧宴樂",
    24: "機械‧自然",
    25: "機械",
    26: "馬納歷亞‧學園",
    27: "馬納歷亞",
    28: "自然",
    29: "士兵‧學園",
    30: "士兵‧八獄",
    31: "士兵‧宴樂",
    32: "士兵‧英雄",
    33: "士兵‧雷維翁",
    34: "士兵‧機械",
    35: "士兵‧自然",
    36: "士兵",
  },
  // "ja": {},
} as const;

export type Cost = number;
export type Atk = number;
export type Life = number;

export const Rarity = {
  1: "Bronze",
  2: "Silver",
  3: "Gold",
  4: "Legendary",
} as const;

export type GetRedEther = number;
export type UseRedEther = number;

export const FormatType = {
  0: "Rotation",
  1: "Unlimited",
} as const;