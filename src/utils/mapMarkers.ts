/** Design reference for map art: 8 UI anchors = (k/8)·(0.95−0.05) + 0.05 → same as fractions 0.1625…0.95 of width. */
export const MAP_ART_WIDTH = 3840
export const MAP_ART_HEIGHT = 1280

/**
 * Horizontal marker positions (CSS `left: …%`) for each **current card index** while playing.
 * Index `0` = first question, `totalCards - 1` = last question; after completion use the last value.
 * Matches the 8-step UI grid: (k/8) of 90% span from 5% → ~16.25% … ~95% (equivalent to x/W at 0.1625…0.950 on 3840px art).
 */
export function defaultEvenMarkerLeftPercents(totalCards: number): number[] {
  if (totalCards <= 0) return []
  return Array.from({ length: totalCards }, (_, i) => 5 + ((i + 1) / totalCards) * 90)
}

export function markerLeftPercentForCard(
  stops: number[] | undefined,
  currentCardIndex: number,
  totalCards: number,
): number {
  const list = stops?.length === totalCards ? stops : defaultEvenMarkerLeftPercents(totalCards)
  if (totalCards <= 0) return 50
  if (currentCardIndex >= totalCards) return list[totalCards - 1]
  return list[Math.max(0, Math.min(currentCardIndex, totalCards - 1))]
}

/** CSS `top` % for marker; values from art Y as `(y / MAP_ART_HEIGHT) * 100` (30–70% band on 1280px-tall source). */
export function markerTopPercentForCard(
  stops: number[] | undefined,
  singleTop: number | undefined,
  currentCardIndex: number,
  totalCards: number,
): number {
  if (stops && stops.length === totalCards) {
    if (currentCardIndex >= totalCards) return stops[totalCards - 1]
    return stops[Math.max(0, Math.min(currentCardIndex, totalCards - 1))]
  }
  return singleTop ?? 50
}
