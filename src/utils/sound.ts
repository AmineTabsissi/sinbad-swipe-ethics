/**
 * Simple sound feedback using Web Audio (no external files required).
 * Optional: add public/sounds/ambient.mp3 and complete.mp3 for extra ambiance.
 */

import { publicUrl } from './publicUrl'

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    } catch {
      return null
    }
  }
  return audioContext
}

/** Short click when making a choice (left or right) */
export function playClick(): void {
  const ctx = getContext()
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(320, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06)
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch {
    // ignore
  }
}

/** Soft “whoosh” when transitioning to next card */
export function playWhoosh(): void {
  const ctx = getContext()
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(120, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.15)
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.22)
  } catch {
    // ignore
  }
}

/** Short “complete” chime when reaching result screen */
export function playComplete(): void {
  const ctx = getContext()
  if (!ctx) return
  try {
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      const start = ctx.currentTime + i * 0.08
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)
      osc.start(start)
      osc.stop(start + 0.3)
    })
  } catch {
    // ignore
  }
}

let ambientAudio: HTMLAudioElement | null = null

/** Play optional ambient loop (if public/sounds/ambient.mp3 exists). Call once when entering play. */
export function playAmbient(): void {
  if (typeof window === 'undefined') return
  try {
    if (!ambientAudio) {
      ambientAudio = new Audio(publicUrl('sounds/ambient.mp3'))
      ambientAudio.loop = true
      ambientAudio.volume = 0.2
    }
    ambientAudio.play().catch(() => {})
  } catch {
    // ignore
  }
}

/** Stop ambient. Call when leaving play or on result. */
export function stopAmbient(): void {
  try {
    if (ambientAudio) {
      ambientAudio.pause()
      ambientAudio.currentTime = 0
    }
  } catch {
    // ignore
  }
}
