import type { AdventureId } from '../types'
import type { AppLocale } from '../i18n/types'
import { getLocalizedAdventure } from '../data/getLocalizedAdventure'
import {
  EPILOGUE_CELL_FR,
  LEGACY_TITLE_FR,
  PLAYSTYLE_FR,
  WEALTH_LABEL_FR,
} from '../locale/fr/endingStringsFr'

/** CSS / layered art key — still three result backgrounds by legacy band. */
export type LegacyBackgroundKey = 'shrewd-merchant' | 'balanced-voyager' | 'moral-wanderer'

export type WealthKey = 'humble' | 'comfortable' | 'legendary'
export type LegacyKey = 'shrewd' | 'balanced' | 'moral'

/** One id per tale × wealth × legacy cell, e.g. `aladdin-humble-moral`. */
export type EndingCellId = `${AdventureId}-${WealthKey}-${LegacyKey}`

export interface EndingInfo {
  id: EndingCellId
  backgroundKey: LegacyBackgroundKey
  wealthKey: WealthKey
  legacyKey: LegacyKey
  title: string
  /** Single bespoke paragraph for this cell (not two stitched halves). */
  epilogue: string
  /** Reflects compassion vs mercantile lean from the eight choices. */
  playstyleCoda: string
}

type Tier = 'low' | 'mid' | 'high'

function tierOf(score: number): Tier {
  if (score <= 33) return 'low'
  if (score <= 66) return 'mid'
  return 'high'
}

function wealthKey(tier: Tier): WealthKey {
  if (tier === 'low') return 'humble'
  if (tier === 'mid') return 'comfortable'
  return 'legendary'
}

function legacyKey(tier: Tier): LegacyKey {
  if (tier === 'low') return 'shrewd'
  if (tier === 'mid') return 'balanced'
  return 'moral'
}

function backgroundKeyFromLegacyTier(legacyTier: Tier): LegacyBackgroundKey {
  if (legacyTier === 'low') return 'shrewd-merchant'
  if (legacyTier === 'mid') return 'balanced-voyager'
  return 'moral-wanderer'
}

const WEALTH_LABEL: Record<WealthKey, string> = {
  humble: 'Humble',
  comfortable: 'Comfortable',
  legendary: 'Legendary',
}

/** Titles still pair legacy archetype with wealth return label. */
const LEGACY_TITLE: Record<
  AdventureId,
  Record<LegacyKey, string>
> = {
  sinbad: {
    shrewd: 'Cursed Opportunist',
    balanced: 'Balanced Voyager',
    moral: 'Moral Wanderer',
  },
  aladdin: {
    shrewd: 'Midnight Accountant',
    balanced: 'Lamp-lit Equilibrium',
    moral: 'Liberator of Wishes',
  },
  horse: {
    shrewd: 'Tyrant on the Thermals',
    balanced: 'Sovereign of Two Silences',
    moral: 'Steward of the Ascent',
  },
}

/**
 * Nine epilogues per tale: [legacy row][wealth column].
 * Written as single beats so low→high legacy reads as moral succession;
 * humble→legendary wealth reads as material arc—each tale completes its own myth while rhyming with the anthology (sea / lamp / sky).
 */
const EPILOGUE_CELL: Record<AdventureId, Record<LegacyKey, Record<WealthKey, string>>> = {
  sinbad: {
    shrewd: {
      humble:
        'The sea paid you in salt and cunning, not coin; you came home lean, ledgers tight, decks scrubbed by a crew that respected your deals more than your mercy. Harbors still tally what you took—and what you refused to call kindness when it was only leverage.',
      comfortable:
        'Cargo ebbed and flowed but your instinct stayed mercantile: you rebuilt hulls on margin and reputation on rumor. Ports call you reliable the way steel is reliable—bright, useful, never mistaken for soft.',
      legendary:
        'Strange riches filled the hold while corridors hollowed with whispers; you won every auction and almost every argument. The Seven Seas record your name where charity might once have recorded a face—and the difference keeps you awake in fair winds.',
    },
    balanced: {
      humble:
        'You crossed the world with ordinary freight and extraordinary patience—small profits, smaller grudges, meals shared when luck thinned. Sailors cite you as the captain who could have gouged them and simply did not.',
      comfortable:
        'Your charts mixed profit with port-welfare: enough gold to refit twice, enough restraint to leave pearl beds breeding. Merchants envy the balance; mariners trust the ink.',
      legendary:
        'Fortune followed routes you drew with open books—tariffs paid, bribes refused where they would rot. Legends and ledgers finally agree on the same coastline, and your name anchors both.',
    },
    moral: {
      humble:
        'You landed with light purses and heavy vows—the widow\'s blessing weighs more than any ingot you declined. Basra remembers you from stories told before dawn, not from tariffs.',
      comfortable:
        'Silver serves soup as often as spectacle in your house; crews stay because you split hardship before spoils. Your harbor rings louder with children than with auctioneers.',
      legendary:
        'Treasures you hauled melted into quays, schools, and second chances—typhoon stockpiles turned into granaries. The map remembers you as shoreline, not shark, and the tide keeps proving it.',
    },
  },
  aladdin: {
    shrewd: {
      humble:
        'Smoke from the lamp curls thin; every wish felt like a receipt you meant to pay later, yet the purse stayed honest enough to face your mother. The street still owns a corner of you that the court never taxed.',
      comfortable:
        'Marble climbed while ledgers shivered—you balanced palace polish against debts no vizier dared read aloud. Power sits at your table; trust arrives in smaller chairs, and both know the menu.',
      legendary:
        'Throne rooms echo with names you purchased wholesale; djinn bow while scribes tally favors still uncashed. Gold stacks like stairs—each step a bargain your younger self would barely recognize.',
    },
    balanced: {
      humble:
        'You left enough carpet for neighbors and enough silence for dignity—wishes small enough to sleep beside. The lamp cools some nights; its warmth stays domestic, and that was the hardest wish to grant.',
      comfortable:
        'Court and kitchen both learned your cadence: grant brilliance, refuse cruelty, tip servers in both worlds. The Sultan’s garden and the alley’s oven recognize the same hand on the latch.',
      legendary:
        'Palaces answer your signature without flinching; markets hear your charity before your heraldry. Power and mercy now share the same inkpot in your edicts, and smoke rises straight.',
    },
    moral: {
      humble:
        'You traded crowns for cough syrup once—no storyteller will let that line die. The lamp remembers mercy as the brightest vein of metal, and you as the one who polished it without greed.',
      comfortable:
        'Wishes fund waterwheels as often as wardrobes; auditors squint, then donate. The city learns to read your name beside wells and windward gates, not only above gates of brass.',
      legendary:
        'Djinn serves as witness, not weapon—you dissolved chains into contracts that protect the sleepless. Sunlight and smoke alike call you steward instead of master, and the ledger closes clean.',
    },
  },
  horse: {
    shrewd: {
      humble:
        'Altitude became alibi—you hovered just high enough to dodge blame while dunes learned your shadow. Engineers whisper your name beside diagrams of fear, and the machine remembers a gentle throttle you rarely used.',
      comfortable:
        'Courts applauded maneuvers no ambassador could duplicate; treaties frayed where your silhouette crossed the sun. The horse listens; parliaments flinch, and chronicles argue whether that was victory.',
      legendary:
        'Thrones rearranged themselves to catch your updraft—tribute stacked until it resembled weather. History files you under storm, not sovereign, and the sky still carries your echo.',
    },
    balanced: {
      humble:
        'You ferried bread over battlements when hunger outranked heraldry; the horse’s ribs remember a descent you chose over display. Yemen’s winds still imitate that kindness without asking permission.',
      comfortable:
        'Diplomats chart your loops as courtesy: show force, land soft, depart with signatures intact. The crown and commons both claim a week you gave them, and neither lies cleanly.',
      legendary:
        'Flight became infrastructure—bridges of air, tariffs on awe, engineers studying your mercy mid-spin. The sky pays rent to your restraint, and heirs inherit blueprints as well as borders.',
    },
    moral: {
      humble:
        'You returned the crown heavier with oaths than jewels—hallways unlearned the echo of threat. Heirlooms breathe because you refused to inhale them wholesale, and cousins discover how heavy air can feel when it is honest.',
      comfortable:
        'Dynasties rearrange succession around your landing gear; laws you thought myth suddenly have ink. Power circulates because you refused to hoard the thermals, and the court learns to speak in updrafts instead of edicts.',
      legendary:
        'The ebony horse rests where children can touch the alloy you once piloted through fear. Legends orbit your refusal to be their god, and the museum doors stay propped open on purpose.',
    },
  },
}

const PLAYSTYLE: Record<
  AdventureId,
  { moreCompassion: string; moreMercantile: string; even: string }
> = {
  sinbad: {
    moreCompassion:
      'Across eight beats your logbook tilts toward mercy—crews recall harbors where you chose rope over reprisal, and those ports still send small favors when you dock.',
    moreMercantile:
      'Across eight beats arithmetic won most arguments aboard: every isle remembers your haggle before your hymn, and your tally of rightward choices reads like a second voyage of its own.',
    even:
      'Across eight beats you split the wind between coin and conscience so evenly that neither column owns the story alone—mates argue in taverns which truth was truer, and both are.',
  },
  aladdin: {
    moreCompassion:
      'Your leftward choices clustered like charms: neighbors swear the lamp cooled faster on nights you favored restraint, and the palace hears their version before yours.',
    moreMercantile:
      'Your rightward choices glittered in the ledgers—bargains stacked like plates at a feast, and the djinn learned your appetite before your apology.',
    even:
      'Mercy and bargain traded the lead so often the smoke never knew which way to curl—observers call that balance dangerous; you call it honest heat.',
  },
  horse: {
    moreCompassion:
      'Honor and truth carried more weight than spectacle in your stick-count: chronicles add a margin note in green ink beside the days you chose the softer landing.',
    moreMercantile:
      'Audacity and seizure mark more notches on your flight log—court painters darken the sky in your portraits, yet engineers admit the machine never lied about your nerve.',
    even:
      'Honor and audacity struck the same number of sparks; the horse’s ribs remember neither side winning forever—only altitude shared between two kinds of courage.',
  },
}

function playstyleCoda(
  adventureId: AdventureId,
  compassionCount: number,
  mercantileCount: number,
  play: Record<AdventureId, { moreCompassion: string; moreMercantile: string; even: string }>,
): string {
  const row = play[adventureId]
  if (compassionCount > mercantileCount) return row.moreCompassion
  if (mercantileCount > compassionCount) return row.moreMercantile
  return row.even
}

export function getEndingInfo(
  adventureId: AdventureId,
  ethics: number,
  wealth: number,
  reputation: number,
  compassionCount: number,
  mercantileCount: number,
  locale: AppLocale = 'en',
): EndingInfo {
  const wealthTier = tierOf(wealth)
  const legacyTier = tierOf(Math.round((ethics + reputation) / 2))

  const wk = wealthKey(wealthTier)
  const lk = legacyKey(legacyTier)

  const id = `${adventureId}-${wk}-${lk}` as EndingCellId

  const useFr = locale === 'fr'
  const legacyMap = useFr ? LEGACY_TITLE_FR : LEGACY_TITLE
  const wealthWord = useFr ? WEALTH_LABEL_FR : WEALTH_LABEL
  const epilogueMap = useFr ? EPILOGUE_CELL_FR : EPILOGUE_CELL
  const play = useFr ? PLAYSTYLE_FR : PLAYSTYLE

  const title = useFr
    ? `${legacyMap[adventureId][lk]} — Retour ${wealthWord[wk]}`
    : `${legacyMap[adventureId][lk]} · ${wealthWord[wk]} Return`

  const epilogue = epilogueMap[adventureId][lk][wk]

  return {
    id,
    backgroundKey: backgroundKeyFromLegacyTier(legacyTier),
    wealthKey: wk,
    legacyKey: lk,
    title,
    epilogue,
    playstyleCoda: playstyleCoda(adventureId, compassionCount, mercantileCount, play),
  }
}

export function buildResultClipboardSummary(
  adventureId: AdventureId,
  ethics: number,
  wealth: number,
  reputation: number,
  mercantileCount: number,
  compassionCount: number,
  locale: AppLocale = 'en',
): string {
  const label = getLocalizedAdventure(adventureId, locale).gameTitle
  const ending = getEndingInfo(
    adventureId,
    ethics,
    wealth,
    reputation,
    compassionCount,
    mercantileCount,
    locale,
  )
  if (locale === 'fr') {
    return `${label} — ${ending.title} [${ending.id}] (Éthique : ${ethics}, Fortune : ${wealth}, Réputation : ${reputation} ; → ${mercantileCount}, ← ${compassionCount}).`
  }
  return `${label} — ${ending.title} [${ending.id}] (Ethics: ${ethics}, Wealth: ${wealth}, Reputation: ${reputation}; → ${mercantileCount}, ← ${compassionCount}).`
}
