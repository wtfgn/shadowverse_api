# Shadowverse API

This API is built based on the official API provided by Shadowverse with additional functionalities. 

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

- Support card searching with query (see below)
- Automatically discard meaningless and unknown data
- Support languages like English, Japanese (on progress) and Chinese
- Cache cards data to facilitate data retrieval
- The 'CV' field is no longer to be empty if the language is English



## API Reference

#### Get all cards

```http
  GET /api/cards
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lang` | `string` |`en` = "English",<br>`ja` = "Japanese",<br> `zh-tw` = "Tranditional Chinese"|
| `card_set_id` |`number`| The extention that the card belongs to. <br> `10000` = "Basic" <br> `10001` = "Standard" <br> `10002` = "Darkness Evolved" <br> `10003` = "Rise of Bahamut" <br> `10004` = "Tempest of the Gods" <br>etc...
|`clan`|`number`|  `0`: "Forestcraft"<br>`1` : "Swordcraft"<br>`2` : "Runecraft"<br>`3` : "Dragoncraft"<br>`4` : "Shadowcraft"<br>`5` : "Bloodcraft"<br>`6` : "Havencraft"<br>`7` : "Portalcraft"
|`char_type`|`number`|`1`: "Follower"<br>`2`: "Amulet"<br>`3`: "Amulet (Countdown)"<br>`4`: "Spell"<br>
|`tribe_name`|`number`|Please refer to the table below|
|`cost`|`number`|The cost of the card|
|`atk`|`number`|The attack of the card|
|`life`|`number`|The defence of the card|
|`rarity`|`number`|  `1`: "Bronze"<br>`2`: "Silver"<br>`3`: "Gold"<br>`4`: "Legendary"<br>|
|`get_red_ether`|`number`|The red ether get when the card is decomposed|
|`use_red_ether`|`number`|The red ether needed for crafting the card|
|`format_type`|`numbet`|`0` = "Rotation"<br>`1` = "Unlimited"|
|`restricted_count`|`number`|The number of that specific card can be put in a deck,<br> `0` means it is prohibited, `3` means no restrictions|
|`restricted_count_co_main`|`number`|Same as above, but only applied in specific modes|
|`restricted_count_co_sub`|`number`|Same as above, but only applied in specific modes|
|`resurgent_card`|`number`|`0` = not resurgent<br>`1` = resurgent<br>If a card is resurgent, that means the card image is copied from another one, but with new abilities and names, etc...

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

```http
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
