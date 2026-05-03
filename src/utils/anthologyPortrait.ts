import type { AdventureId, GameState } from '../types'
import { ADVENTURE_ORDER, adventures } from '../data/adventureConfig'
import { getLocalizedAdventure } from '../data/getLocalizedAdventure'
import type { AppLocale } from '../i18n/types'
import { buildHubTapestryCopyFr } from '../locale/fr/hubTapestryFr'
import { loadGameState } from '../store/gameState'
import { getEndingInfo } from './endings'
import type { HubTapestryCopy, TaleCompletionSummary } from './anthologyHubTypes'

export type { HubTapestryCopy, TaleCompletionSummary } from './anthologyHubTypes'

function isCompletedRun(saved: GameState | null, adventureId: AdventureId): saved is GameState {
  if (!saved) return false
  const total = adventures[adventureId].scenarios.length
  return saved.screen === 'result' && saved.currentCardIndex >= total
}

/** Reads localStorage: one summary per tale that has a finished result saved. */
export function loadCompletedTaleSummaries(locale: AppLocale = 'en'): TaleCompletionSummary[] {
  const out: TaleCompletionSummary[] = []
  for (const id of ADVENTURE_ORDER) {
    const saved = loadGameState(id)
    if (!isCompletedRun(saved, id)) continue
    const def = getLocalizedAdventure(id, locale)
    const ending = getEndingInfo(
      id,
      saved.ethicsScore,
      saved.wealthScore,
      saved.reputationScore,
      saved.compassionCount,
      saved.mercantileCount,
      locale,
    )
    out.push({
      adventureId: id,
      gameTitle: def.gameTitle,
      endingId: ending.id,
      endingTitle: ending.title,
      ethics: saved.ethicsScore,
      wealth: saved.wealthScore,
      reputation: saved.reputationScore,
      compassionCount: saved.compassionCount,
      mercantileCount: saved.mercantileCount,
    })
  }
  return out
}

function avg(values: number[]): number {
  if (values.length === 0) return 50
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

/**
 * Progressive copy for the hub: 0–3 completed runs. When all three exist, closes with a single-voice “this is you”
 * that names each ending and reads averages as one ledger across the anthology.
 */
export function buildHubTapestryCopy(summaries: TaleCompletionSummary[], locale: AppLocale = 'en'): HubTapestryCopy {
  if (locale === 'fr') return buildHubTapestryCopyFr(summaries)

  const n = summaries.length

  if (n === 0) {
    return {
      headline: 'Your ledger across the nights',
      tagline: 'Each finished tale leaves a mark here.',
      portrait:
        'Play through any story to its ending—when you return to this hall, your outcome will appear in the row below. Finish all three voyages and the tapestry names you as one reader across Sinbad, Aladdin, and the Ebony Horse.',
    }
  }

  if (n === 1) {
    const s = summaries[0]
    return {
      headline: 'Your ledger across the nights',
      tagline: 'One voyage has spoken; the others still listen.',
      portrait: `So far the nights know you chiefly through **${s.gameTitle}**—“${s.endingTitle}” (${s.endingId}). That single ending is already a face in the mosaic; when you close the other two tales, this wall will braid all three into one line that says, in plain ink, who you were when Scheherazade handed you the quill.`,
    }
  }

  if (n === 2) {
    const [a, b] = [...summaries].sort(
      (x, y) => ADVENTURE_ORDER.indexOf(x.adventureId) - ADVENTURE_ORDER.indexOf(y.adventureId),
    )
    const ae = avg([a.ethics, b.ethics])
    const aw = avg([a.wealth, b.wealth])
    const ar = avg([a.reputation, b.reputation])
    const comp = a.compassionCount + b.compassionCount
    const merc = a.mercantileCount + b.mercantileCount
    const lean =
      comp > merc
        ? 'Across both runs your leftward choices outnumbered the right—mercy and restraint edged ahead of bargain and seizure.'
        : merc > comp
          ? 'Across both runs the rightward path dominated—bargain, audacity, or mercantile hunger spoke louder than the left.'
          : 'Across both runs you split the arrows evenly—two different myths, one steady hand on the scale.'

    return {
      headline: 'Your ledger across the nights',
      tagline: 'Two finished tales; the third still waits.',
      portrait: `**${a.gameTitle}** closed as “${a.endingTitle}”; **${b.gameTitle}** closed as “${b.endingTitle}”. Averaged between them your meters sit near **Ethics ${ae}**, **Wealth ${aw}**, **Reputation ${ar}**. ${lean} Finish the last night and the line below becomes a single verdict: this is you across the whole anthology.`,
    }
  }

  const [st, al, ho] = [...summaries].sort(
    (x, y) => ADVENTURE_ORDER.indexOf(x.adventureId) - ADVENTURE_ORDER.indexOf(y.adventureId),
  )
  const ethics = avg([st.ethics, al.ethics, ho.ethics])
  const wealth = avg([st.wealth, al.wealth, ho.wealth])
  const reputation = avg([st.reputation, al.reputation, ho.reputation])
  const compAll = st.compassionCount + al.compassionCount + ho.compassionCount
  const mercAll = st.mercantileCount + al.mercantileCount + ho.mercantileCount
  const totalChoices = compAll + mercAll
  const compPct = totalChoices > 0 ? Math.round((compAll / totalChoices) * 100) : 50

  const weave = `${st.gameTitle}: “${st.endingTitle}” · ${al.gameTitle}: “${al.endingTitle}” · ${ho.gameTitle}: “${ho.endingTitle}”.`

  const voice =
    compPct >= 58
      ? 'Twenty-four choices, and the compass side of you won more often than not—sea, lamp, and sky all heard the same patient footfall.'
      : compPct <= 42
        ? 'Twenty-four choices, and the bargain side of you kept stealing the beat—each tale let you seize a different kind of throne.'
        : 'Twenty-four choices split without a tyrant: neither arrow owns the anthology; you rehearsed three different moral keys in the same hand.'

  return {
    headline: 'This is you across the nights',
    tagline: 'Three finished voyages — one ledger.',
    portrait: `${weave} Averaged across every ending, your ink settles near **Ethics ${ethics}**, **Wealth ${wealth}**, **Reputation ${reputation}**. ${voice} If a stranger asked who you are after Scheherazade’s shift, you could hand them this strip: not one story, but the **mix** of all three—and the meters prove you meant every fork.`,
  }
}

/** Split `**bold**` spans for React rendering. */
export function splitTapestryBold(portrait: string): Array<{ bold: boolean; text: string }> {
  const parts: Array<{ bold: boolean; text: string }> = []
  const chunks = portrait.split(/\*\*/)
  chunks.forEach((chunk, i) => {
    if (chunk.length === 0) return
    parts.push({ bold: i % 2 === 1, text: chunk })
  })
  if (parts.length === 0) parts.push({ bold: false, text: portrait })
  return parts
}
