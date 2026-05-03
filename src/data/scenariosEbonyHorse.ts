import type { Scenario } from '../types'

export const scenariosEbonyHorse: Scenario[] = [
  {
    id: 'horse-inventors-hall',
    voyageTitle: 'Beat 1: The Inventors’ Gift',
    summary:
      'In a glittering Persian court an Indian craftsman unveils ebony limbs, inlaid jewels, brass rivets—a horse that leaps skyward without rein or grain.',
    dilemma:
      'The Sultan presses you, the prince, to proclaim it miracles or mechanic. Applauding truth could doom the craftsman to envy—or paint your court as reckless dreamers worshipping false sorcery.',
    rightChoiceText:
      'Praise blind faith and omens—“a gift dropped from unseen hands.”',
    leftChoiceText:
      'Praise ingenuity—credit the smiths, hinges, gears, daring.',
    leftConsequence:
      '“You elevate craft over myth—envy wakes, but the workshop gains a heartbeat.”',
    rightConsequence:
      '“The court kneels faster when wonder stays blind.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 12 },
    rightDelta: { ethics: -8, wealth: 8, reputation: -10 },
  },
  {
    id: 'horse-stolen-mount',
    voyageTitle: 'Beat 2: The Stolen Mount',
    summary:
      'Your younger brother leaps onto the pedestal, twists the concealed pins, vanishes upward while courtiers shield their faces from whipped sand.',
    dilemma:
      'You could denounce him as thief before the offended Sultan—or shoulder blame as elder brother until you recover both horse and peace.',
    rightChoiceText:
      'Name him publicly to save your diplomatic skin.',
    leftChoiceText:
      'Beg time to retrieve him privately and restore dignity.',
    leftConsequence:
      '“You swallow blame for chaos that is not wholly yours.”',
    rightConsequence:
      '“You keep your robes clean—blood becomes his alone.”',
    leftDelta: { ethics: 8, wealth: -8, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -8 },
  },
  {
    id: 'horse-yemen-parapet',
    voyageTitle: 'Beat 3: The Princess Above Yemen',
    summary:
      'From impossible height you glimpse terraced Yemen: a princess on a parapet rehearses hymns to the dusk while guards believe only birds haunt that altitude.',
    dilemma:
      'You can glide past with a clipped promise to return—or circle down recklessly tonight, risking war for a heartbeat’s confession.',
    rightChoiceText:
      'Descend beside her chambers before dawn—steal introduction from the clouds.',
    leftChoiceText:
      'Mark her window map in memory; withdraw and send lawful envoys upward.',
    leftConsequence:
      '“Duty delays desire—war drums quiet a week longer.”',
    rightConsequence:
      '“Hearts collide before diplomats uncap their inks.”',
    leftDelta: { ethics: 14, wealth: -6, reputation: 8 },
    rightDelta: { ethics: -12, wealth: 10, reputation: -6 },
  },
  {
    id: 'horse-king-furious',
    voyageTitle: 'Beat 4: The King Who Sees Shadows',
    summary:
      'Her father glimpses hovering silhouettes; treason drums beat before anyone defines what flew.',
    dilemma:
      'You could ransom her affection with feats of airborne terror—or appear disarmed before the throne, risking chains rather than bombardment.',
    rightChoiceText:
      'Buzz the plaza at noon—crowds kneel faster than diplomats talk.',
    leftChoiceText:
      'Land voluntarily, relinquish dagger, plead guest-right.',
    leftConsequence:
      '“Chains rattle politely—your voice remains human.”',
    rightConsequence:
      '“Terror bends knees; treaties snap like kindling afterward.”',
    leftDelta: { ethics: 12, wealth: -8, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 8, reputation: -12 },
  },
  {
    id: 'horse-flight-home',
    voyageTitle: 'Beat 5: The Two-Bodied Wind',
    summary:
      'Saddle space tightens—you must shepherd two souls astride alloys never meant for love’s weight.',
    dilemma:
      'Drop ballast—you could cast away her veils sewn with heirloom pearls—or shed your cloak of mailed gold that marks you prince.',
    rightChoiceText:
      'Toss ceremonial mail—preserve her tokens of lineage.',
    leftChoiceText:
      'Toss ceremonial gold—preserve steel that might defend you landing.',
    leftConsequence:
      '“Pearls fall like snow—you land heavier in honor than in coin.”',
    rightConsequence:
      '“You keep her heraldry blazing—risking bruises on descent.”',
    leftDelta: { ethics: -5, wealth: -10, reputation: 8 },
    rightDelta: { ethics: 5, wealth: 8, reputation: -5 },
  },
  {
    id: 'horse-brothers-enmity',
    voyageTitle: 'Beat 6: The Feast of Knives Behind Smiles',
    summary:
      'Homecoming should crown you—instead counselors murmur succession, cousins eye the horse.',
    dilemma:
      'Split claim to the throne for quiet—or sharpen law so only undisputed heirs touch the treasury keys.',
    rightChoiceText:
      'Merge titles with generous stipends—“share the ascent.”',
    leftChoiceText:
      'Expose every plot—even kin—before vows are sworn again.',
    leftConsequence:
      '“The hall smells of iron honesty—some chairs stay empty forever.”',
    rightConsequence:
      '“You trade titles for fragile peace stitched with stipends.”',
    leftDelta: { ethics: -5, wealth: -8, reputation: 10 },
    rightDelta: { ethics: 6, wealth: 6, reputation: -8 },
  },
  {
    id: 'horse-peoples-trial',
    voyageTitle: 'Beat 7: The Market Square Inquiry',
    summary:
      'Rumours run: sorcery, abduction, star-stolen princesses. Judges demand spectacle.',
    dilemma:
      'You could unveil the ebony miracle for crowds—or narrate clumsy mortal love without conjuring spectacle that terrifies pilgrims.',
    rightChoiceText:
      'Fly figure-eights overhead until awe silences sceptics.',
    leftChoiceText:
      'Speak from ground level; let the horse stand cold and silent.',
    leftConsequence:
      '“Sceptics chew your words—they find no miracle, only mortal sweat.”',
    rightConsequence:
      '“The plaza roars—you win the crowd, summon new fears.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 14 },
    rightDelta: { ethics: -8, wealth: 8, reputation: -10 },
  },
  {
    id: 'horse-last-switch',
    voyageTitle: 'Beat 8: The Pin Nobody Teaches',
    summary:
      'You learn finally which studs reverse climb—and which plummet—not every rider deserves that grammar.',
    dilemma:
      'Smash controls so no petty tyrant ever mounts—or archive instruction under seal for heirs you trust?',
    rightChoiceText:
      'Seal blueprints solely to crowned descendants.',
    leftChoiceText:
      'Break the ascent mechanism—scatter pieces to smiths anonymously.',
    leftConsequence:
      '“Nobody owns vertical escape anymore—liberty and peril share the wind.”',
    rightConsequence:
      '“You crown future heirs—and future tyrants.”',
    leftDelta: { ethics: 12, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -6, wealth: 8, reputation: -5 },
  },
]
