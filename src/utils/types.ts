export type CardRarity = 'free' | 'common' | 'rare' | 'epic' | 'legendary'
export type CardType = 'spell' | 'minion' | 'weapon'
export type MinionType =
  | 'bloodelf'
  | 'draenei'
  | 'gnome'
  | 'goblin'
  | 'human'
  | 'nightelf'
  | 'orc'
  | 'tauren'
  | 'troll'
  | 'undead'
  | 'murloc'
  | 'demon'
  | 'mech'
  | 'elemental'
  | 'beast'
  | 'totem'
  | 'pirate'
  | 'dragon'
  | 'quilboar'
  | 'halforc'
  | 'naga'
  | 'all'
export type CardKeywords =
  | 'taunt'
  | 'spellpower'
  | 'divine-shield'
  | 'deathrattle'
  | 'charge'
  | 'secret'
  | 'stealth'
  | 'battlecry'
  | 'freeze'
  | 'windfury'
  | 'combo'
  | 'overload'
  | 'silence'
  | 'counter'
  | 'immune'
  | 'spare-part'
  | 'inspire'
  | 'discover'
  | 'quest'
  | 'poisonous'
  | 'adapt'
  | 'lifesteal'
  | 'recruit'
  | 'echo'
  | 'rush'
  | 'overkill'
  | 'startofgamekeyword'
  | 'modular'
  | 'evilzug'
  | 'twinspell'
  | 'mega-windfury'
  | 'reborn'
  | 'empower'
  | 'outcast'
  | 'spellburst'
  | 'sidequest'
  | 'corrupt'
  | 'start-of-combat'
  | 'questline'
  | 'trade'
  | 'frenzy'
  | 'honorablekill'
  | 'spellpowernature'
  | 'blood-gem'
  | 'avenge'
  | 'colossal'
  | 'dredge'
  | 'spellcraft'
  | 'allied'
  | 'infuse'
export type GameMode = 'battlegrounds' | 'constructed' | 'mercenaries'
export type SpellSchool =
  | 'arcane'
  | 'fire'
  | 'frost'
  | 'nature'
  | 'shadow'
  | 'fel'
  | 'holy'
export type Region = 'us' | 'eu' | 'kr' | 'tw' | 'cn'
export type Locale =
  | 'de_DE'
  | 'en_US'
  | 'es_ES'
  | 'es_MX'
  | 'fr_FR'
  | 'it_IT'
  | 'ja_JP'
  | 'ko_KR'
  | 'pl_PL'
  | 'pt_BR'
  | 'ru_RU'
  | 'th_TH'
  | 'zh_CN'
  | 'zh_TW'
export interface CardSearchCriteria {
  locale?: Locale
  set?: string
  class?: string
  manaCost?: number | number[] | string | string[]
  attack?: number | number[] | string | string[]
  health?: number | number[] | string | string[]
  collectible?: string
  rarity?: CardRarity
  type?: CardType
  minionType?: MinionType
  keyword?: CardKeywords
  textFilter?: string
  gameMode?: GameMode
  spellSchool?: SpellSchool
  page?: number
  pageSize?: number
  sort?: string | string[]
}

export interface CardSearchResponse {
  cards: Card[]
  cardCount: number
  pageCount: number
  page: number
}

export interface Card {
  id: number
  collectible: number
  slug: string
  classId: number
  multiClassIds: number[]
  spellSchoolId?: number
  cardTypeId: number
  cardSetId: number
  rarityId: number
  artistName: string
  manaCost: number
  name: string
  text: string
  image: string
  imageGold: string
  flavorText: string
  cropImage: string
  keywordIds?: number[]
  duels?: Duels
  health?: number
  attack?: number
  copyOfCardId?: number
  minionTypeId?: number
  childIds?: number[]
}

export interface Duels {
  relevant: boolean
  constructed: boolean
}
