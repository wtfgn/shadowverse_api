# Shadowverse API

This API is built based on the official API provided by Shadowverse with additional functionalities and some improvements.


## Features

- Support card searching with query (see below)
- Automatically discard meaningless and unknown data
- Support languages like English, Japanese (on progress) and Chinese
- Cache cards data to facilitate data retrieval
- The 'CV' field is no longer to be empty if the language is English



## API Reference

#### Get all cards

```
  GET /api/cards
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lang` | `string` |`en` = "English",<br>`ja` = "Japanese",<br> `zh-tw` = "Tranditional Chinese"<br>If not specified, the default language is English|
|`card_name`|`string`|The name of the card in the specified language, if language is not specified, the default language is English|
| `card_set_id` |`number`| The extention that the card belongs to. <br> `10000` = "Basic" <br> `10001` = "Standard" <br> `10002` = "Darkness Evolved" <br> `10003` = "Rise of Bahamut" <br> `10004` = "Tempest of the Gods" <br>etc...
|`clan`|`number`|  `0`: "Neutral"<br>`1`: "Forestcraft"<br>`2` : "Swordcraft"<br>`3` : "Runecraft"<br>`4` : "Dragoncraft"<br>`5` : "Shadowcraft"<br>`6` : "Bloodcraft"<br>`7` : "Havencraft"<br>`8` : "Portalcraft"
|`char_type`|`number`|`1`: "Follower"<br>`2`: "Amulet"<br>`3`: "Amulet (Countdown)"<br>`4`: "Spell"<br>
|`tribe_name`|`number`|The code of the tribe name, please refer to the table below<br>`0` = "-"<br>`1` = "Academic"|
|`cost`|`number`|The cost of the card|
|`atk`|`number`|The attack of the card|
|`life`|`number`|The defence of the card|
|`rarity`|`number`|  `1`: "Bronze"<br>`2`: "Silver"<br>`3`: "Gold"<br>`4`: "Legendary"<br>|
|`get_red_ether`|`number`|The red ether get when the card is decomposed|
|`use_red_ether`|`number`|The red ether needed for crafting the card|
|`format_type`|`numbet`|`0` = "Unlimited"<br>`1` = "Rotation"|
|`restricted_count`|`number`|The number of that specific card can be put in a deck,<br> `0` means it is prohibited, `3` means no restrictions|
|`restricted_count_co_main`|`number`|Same as above, but only applied in specific modes|
|`restricted_count_co_sub`|`number`|Same as above, but only applied in specific modes|
|`resurgent_card`|`number`|`0` = not resurgent<br>`1` = resurgent<br>If a card is resurgent, that means the card image is copied from another one, but with new abilities and names, etc...|

```JSON
{
  "en": {
    "0": "-",
    "1": "Academic",
    "2": "All",
    "3": "Armed",
    "4": "Artifact",
    "5": "Chess",
    "6": "Cmdr./Acad.",
    "7": "Cmdr./Cdmn.",
    "8": "Cmdr./Fes.",
    "9": "Cmdr./Hero.",
    "10": "Cmdr./Lvn.",
    "11": "Cmdr./Mach.",
    "12": "Cmdr./Nat.",
    "13": "Commander",
    "14": "Condemned",
    "15": "Earth Sigil",
    "16": "Festive",
    "17": "Heroic",
    "18": "Levin",
    "19": "Loot",
    "20": "Mach./Acad.",
    "21": "Mach./Art.",
    "22": "Mach./Cdmn.",
    "23": "Mach./Fes.",
    "24": "Mach./Nat.",
    "25": "Machina",
    "26": "Mys./Acad.",
    "27": "Mysteria",
    "28": "Natura",
    "29": "Ofcr./Acad.",
    "30": "Ofcr./Cdmn.",
    "31": "Ofcr./Fes.",
    "32": "Ofcr./Hero.",
    "33": "Ofcr./Lvn.",
    "34": "Ofcr./Mach.",
    "35": "Ofcr./Nat.",
    "36": "Officer"
  },
  "zh-tw": {
    "0": "-",
    "1": "學園",
    "2": "全部",
    "3": "武裝",
    "4": "創造物",
    "5": "西洋棋",
    "6": "指揮官‧學園",
    "7": "指揮官‧八獄",
    "8": "指揮官‧宴樂",
    "9": "指揮官‧英雄",
    "10": "指揮官‧雷維翁",
    "11": "指揮官‧機械",
    "12": "指揮官‧自然",
    "13": "指揮官",
    "14": "八獄",
    "15": "土之印",
    "16": "宴樂",
    "17": "英雄",
    "18": "雷維翁",
    "19": "財寶",
    "20": "機械‧學園",
    "21": "機械‧創造物",
    "22": "機械‧八獄",
    "23": "機械‧宴樂",
    "24": "機械‧自然",
    "25": "機械",
    "26": "馬納歷亞‧學園",
    "27": "馬納歷亞",
    "28": "自然",
    "29": "士兵‧學園",
    "30": "士兵‧八獄",
    "31": "士兵‧宴樂",
    "32": "士兵‧英雄",
    "33": "士兵‧雷維翁",
    "34": "士兵‧機械",
    "35": "士兵‧自然",
    "36": "士兵"
  },
  "ja": {
    "0": "-",
    "1": "学園",
    "2": "すべて",
    "3": "武装",
    "4": "アーティファクト",
    "5": "チェス",
    "6": "指揮官・学園",
    "7": "指揮官・八獄",
    "8": "指揮官・宴楽",
    "9": "指揮官・ヒーロー",
    "10": "指揮官・レヴィオン",
    "11": "指揮官・機械",
    "12": "指揮官・自然",
    "13": "指揮官",
    "14": "八獄",
    "15": "土の印",
    "16": "宴楽",
    "17": "ヒーロー",
    "18": "レヴィオン",
    "19": "財宝",
    "20": "機械・学園",
    "21": "機械・アーティファクト",
    "22": "機械・八獄",
    "23": "機械・宴楽",
    "24": "機械・自然",
    "25": "機械",
    "26": "マナリア・学園",
    "27": "マナリア",
    "28": "自然",
    "29": "兵士・学園",
    "30": "兵士・八獄",
    "31": "兵士・宴楽",
    "32": "兵士・ヒーロー",
    "33": "兵士・レヴィオン",
    "34": "兵士・機械",
    "35": "兵士・自然",
    "36": "兵士",
  },
}
```

Example response:
```json
[
  {
    "card_id": 130324010,
    "card_set_id": 10030,
    "card_name": "Checkmate",
    "char_type": 4,
    "clan": 3,
    "tribe_name": "Chess",
    "skill": "cost_change,summon_token,powerup,quick",
    "skill_disc": "At the end of your turn, if there are any allied followers with at least 8 attack in play, subtract 3 from the cost of this card.<br>----------<br>Summon 5 Magical Pawns and give them +1/+0 and Storm.",
    "org_skill_disc": "At the end of your turn, if there are any allied followers with at least 8 attack in play, subtract 3 from the cost of this card.<br>----------<br>Summon 5 [b]Magical Pawn[/b][b]s[/b] and give them +1/+0 and [b]Storm[/b].",
    "evo_skill_disc": "",
    "org_evo_skill_disc": "",
    "cost": 10,
    "atk": 0,
    "life": 0,
    "evo_atk": 0,
    "evo_life": 0,
    "rarity": 2,
    "get_red_ether": 50,
    "use_red_ether": 200,
    "description": "But if you ask me, what this really proves is that my potential, no, our potential, is greater than yours!<br>—Shion Otosaka",
    "evo_description": "",
    "cv": "-",
    "base_card_id": 130324010,
    "format_type": 1,
    "restricted_count": 3,
    "restricted_count_co_main": 3,
    "restricted_count_co_sub": 3,
    "resurgent_card": 0
  },
  {
    "card_id": 800344020,
    "card_set_id": 90000,
    "card_name": null,
    "char_type": 4,
    "clan": 3,
    "tribe_name": "-",
    "skill": "draw,update_deck,pp_modifier",
    "skill_disc": "",
    "org_skill_disc": "",
    "evo_skill_disc": "",
    "org_evo_skill_disc": "",
    "cost": 10,
    "atk": 0,
    "life": 0,
    "evo_atk": 0,
    "evo_life": 0,
    "rarity": 4,
    "get_red_ether": 0,
    "use_red_ether": 0,
    "description": "",
    "evo_description": "",
    "cv": "-",
    "base_card_id": 800344020,
    "format_type": 0,
    "restricted_count": 3,
    "restricted_count_co_main": 3,
    "restricted_count_co_sub": 3,
    "resurgent_card": 0
  },
  {
    "card_id": 800344060,
    "card_set_id": 90000,
    "card_name": null,
    "char_type": 4,
    "clan": 3,
    "tribe_name": "-",
    "skill": "draw,update_deck,pp_modifier",
    "skill_disc": "",
    "org_skill_disc": "",
    "evo_skill_disc": "",
    "org_evo_skill_disc": "",
    "cost": 10,
    "atk": 0,
    "life": 0,
    "evo_atk": 0,
    "evo_life": 0,
    "rarity": 4,
    "get_red_ether": 0,
    "use_red_ether": 0,
    "description": "",
    "evo_description": "",
    "cv": "-",
    "base_card_id": 800344020,
    "format_type": 0,
    "restricted_count": 3,
    "restricted_count_co_main": 3,
    "restricted_count_co_sub": 3,
    "resurgent_card": 0
  },
  {
    "card_id": 900334040,
    "card_set_id": 90000,
    "card_name": "Anne's Sorcery",
    "char_type": 4,
    "clan": 3,
    "tribe_name": "Mysteria",
    "skill": "damage",
    "skill_disc": "Deal X damage to an enemy. X equals the number of other Mysteria cards you've played this match.",
    "org_skill_disc": "Deal X damage to an enemy. X equals the number of other Mysteria cards you've played this match.",
    "evo_skill_disc": "",
    "org_evo_skill_disc": "",
    "cost": 10,
    "atk": 0,
    "life": 0,
    "evo_atk": 0,
    "evo_life": 0,
    "rarity": 3,
    "get_red_ether": 0,
    "use_red_ether": 0,
    "description": "\"I use my powers for the sake of others—I'll protect Mysteria Academy no matter what!\" <br>—Anne, Mysterian Prodigy",
    "evo_description": "",
    "cv": "日笠陽子",
    "base_card_id": 900334040,
    "format_type": 0,
    "restricted_count": 3,
    "restricted_count_co_main": 3,
    "restricted_count_co_sub": 3,
    "resurgent_card": 0
  }
]
```
#### Get card

```
  GET /api/cards/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of card to fetch |

Example response:
```JSON
{
  "card_id": 900044020,
  "card_set_id": 90000,
  "card_name": "Astaroth's Reckoning",
  "char_type": 4,
  "clan": 0,
  "tribe_name": "-",
  "skill": "damage",
  "skill_disc": "Deal damage to the enemy leader until their defense drops to 1.",
  "org_skill_disc": "Deal damage to the enemy leader until their defense drops to 1.",
  "evo_skill_disc": "",
  "org_evo_skill_disc": "",
  "cost": 10,
  "atk": 0,
  "life": 0,
  "evo_atk": 0,
  "evo_life": 0,
  "rarity": 4,
  "get_red_ether": 0,
  "use_red_ether": 0,
  "description": "Your fate's reached the end of its thread.",
  "evo_description": "",
  "cv": "-",
  "base_card_id": 900044020,
  "format_type": 0,
  "restricted_count": 3,
  "restricted_count_co_main": 3,
  "restricted_count_co_sub": 3,
  "resurgent_card": 0
}
```
#### Get card names

```
  GET /api/cards/names
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lang`      | `string` | **Optional**. The language of the card names. Default is English. |

