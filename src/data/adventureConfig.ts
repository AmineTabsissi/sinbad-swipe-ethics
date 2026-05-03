import type { AdventureId } from '../types'
import type { Scenario } from '../types'
import { scenariosSinbad } from './scenariosSinbad'
import { scenariosAladdin } from './scenariosAladdin'
import { scenariosEbonyHorse } from './scenariosEbonyHorse'
import { defaultEvenMarkerLeftPercents } from '../utils/mapMarkers'

/** Eight UI anchors (CSS `left` %) = fractions 0.1625 … 0.950 of width (3840×1280 reference). */
export const MAP_MARKER_LEFT_PERCENTS_8 = defaultEvenMarkerLeftPercents(8) as readonly number[]

export interface AdventureDefinition {
  id: AdventureId
  hash: string
  hubTitle: string
  hubBlurb: string
  icon: string
  gameTitle: string
  gameSubtitle: string
  homeDescription: string
  leftVerb: string
  rightVerb: string
  playKeyboardHint: string
  /** Filename in `public/` for the voyage progress strip map (PNG, SVG, etc.). */
  mapImage: string
  /** Short descriptive alt for screen readers when the decorative map banner is skipped. */
  mapImageAlt: string
  /**
   * Optional: CSS `left` % for the progress marker on each card index (length === scenarios.length).
   * Omit to use the default even spacing. Tune to match illustrated waypoints on each banner.
   */
  mapMarkerLeftPercents?: number[]
  /** CSS `object-position` for the banner image (e.g. `center 55%`) so crops align with paths. */
  mapImageObjectPosition?: string
  /** Single CSS `top` % when no per-card array (default 50). */
  mapMarkerTopPercent?: number
  /** Per-card CSS `top` % (length === scenarios.length); use with art Y = (y / 1280) × 100 for 1280px-tall maps. */
  mapMarkerTopPercents?: number[]
  scenarios: Scenario[]
}

export const ADVENTURE_ORDER: AdventureId[] = ['sinbad', 'aladdin', 'horse']

export const adventures: Record<AdventureId, AdventureDefinition> = {
  sinbad: {
    id: 'sinbad',
    hash: 'sinbad',
    hubTitle: 'Sinbad: Swipe Ethics',
    hubBlurb: 'Eight legendary voyages—sea, greed, solidarity. Three meters seal your ledger.',
    icon: '🧭',
    gameTitle: 'Sinbad: Swipe Ethics',
    gameSubtitle:
      'A laptop-first, eight-card voyage through moral trade-offs and mercantile temptation.',
    homeDescription:
      'Decide whether Sinbad pursues profit or compassion on each voyage. Your choices shift Ethics, Wealth, and Reputation—shaping your final legacy.',
    leftVerb: 'Compassionate',
    rightVerb: 'Mercantile',
    playKeyboardHint: 'Compassion · Mercantile',
    mapImage: 'sinbad-voyages-map.png',
    mapImageAlt:
      'Stylised map of Sinbad’s voyages—from Basra across seas and legends—marking progression through eight beats.',
    scenarios: scenariosSinbad,
  },
  aladdin: {
    id: 'aladdin',
    hash: 'aladdin',
    hubTitle: 'Aladdin: The Lamp Ledger',
    hubBlurb: 'Eight beats from cave to djinn—with every wish scribbled somewhere as debt.',
    icon: '🪔',
    gameTitle: 'Aladdin: The Lamp Ledger',
    gameSubtitle:
      'Mercy and restraint versus appetite and bargains—guided by Ethics, Wealth, and Reputation.',
    homeDescription:
      'Lead Aladdin from street to throne. Choose heart or bargain on each beat; your three meters forge one of nine fates.',
    leftVerb: 'Mercy · Restraint',
    rightVerb: 'Aspiration · Bargain',
    playKeyboardHint: 'Restraint · Bargain',
    mapImage: 'aladdin-voyages-map.png',
    mapImageAlt:
      'Panoramic lamp-ledger journey: golden path through desert night with eight glowing story stops from cave to distant city.',
    // Cave sits left of the even UI grid; lamp low in valley, moved palace high on hill (tops must not invert).
    mapMarkerLeftPercents: [7, 16.25, 27.5, 50, 61.25, 72.5, 83.75, 95],
    mapMarkerTopPercents: [
      (720 / 1280) * 100,
      (580 / 1280) * 100,
      (620 / 1280) * 100,
      (655 / 1280) * 100,
      (470 / 1280) * 100,
      (575 / 1280) * 100,
      (625 / 1280) * 100,
      (585 / 1280) * 100,
    ],
    mapImageObjectPosition: 'center 50%',
    scenarios: scenariosAladdin,
  },
  horse: {
    id: 'horse',
    hash: 'ebony-horse',
    hubTitle: 'The Ebony Horse: Skybound Crown',
    hubBlurb: 'Eight beats of impossible flight—a machine that jealousy and courts cannot ignore.',
    icon: '🐎',
    gameTitle: 'The Ebony Horse: Skybound Crown',
    gameSubtitle:
      'Honor in the heights versus seizure of the sky—instrument, love, dynasty.',
    homeDescription:
      'Ride the arcs of Scheherazade’s airborne marvel. Ethics, Wealth, and Reputation track whether glory becomes legend or catastrophe.',
    leftVerb: 'Honor · Truth',
    rightVerb: 'Audacity · Seizure',
    playKeyboardHint: 'Honor · Audacity',
    mapImage: 'ebony-horse-voyages-map.png',
    mapImageAlt:
      'Panoramic sky-voyage: golden constellation path with eight circular story vignettes above an Arabian cityscape.',
    // First vignette sits left of the even UI grid; arc wave matches the eight circles on ebony-horse-voyages-map (cover + center 28%).
    mapMarkerLeftPercents: [7, 19, 31, 44, 56, 69, 81, 93],
    mapMarkerTopPercents: [48, 45, 42, 40, 42, 48, 45, 48],
    mapImageObjectPosition: 'center 28%',
    scenarios: scenariosEbonyHorse,
  },
}

const HASH_LOOKUP: Record<string, AdventureId> = {
  sinbad: 'sinbad',
  aladdin: 'aladdin',
  'ebony-horse': 'horse',
}

export function adventureIdFromHashFragment(fragment: string): AdventureId | null {
  const key = fragment.replace(/^#\/?/, '').toLowerCase()
  return HASH_LOOKUP[key] ?? null
}
