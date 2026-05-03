import type { Scenario } from '../types'

/**
 * Order follows the **lamp-ledger map** left → right: cave → golden threshold → stone court
 * → lamp → uprooted palace → shadowed court → narrow peril → final bargain.
 */
export const scenariosAladdin: Scenario[] = [
  {
    id: 'aladdin-ring-cave',
    voyageTitle: 'Beat 1: The Ring and the Cave',
    summary:
      'A disguised magician leads young Aladdin into a forbidden cavern stacked with forbidden gold—but the treasure is guarded, and escape depends on obedience rather than greed.',
    dilemma:
      'Before Aladdin descends, his mother slips him her only heirloom: a tarnished silver ring said to whisper protection. The magician sneers—he wants obedience, not sentiment.',
    rightChoiceText:
      'Leave the ring with your mother to prove you trust the magician’s plan and travel light.',
    leftChoiceText:
      'Wear the ring anyway—you feel safer with her blessing on your hand.',
    rightConsequence:
      '“You look compliant, but you step into darkness unarmed.”',
    leftConsequence:
      '“You risk angering the magician, yet you refuse to surrender all comfort.”',
    leftDelta: { ethics: 8, wealth: -5, reputation: 8 },
    rightDelta: { ethics: -8, wealth: 10, reputation: -5 },
  },
  {
    id: 'aladdin-palace',
    voyageTitle: 'Beat 2: The Palace Wish',
    summary:
      'The genie of the lamp offers grandeur: marble courts, sapphire pools, armies of unseen servants—all in one night.',
    dilemma:
      'You could ask for modest comfort for your mother and honest work for yourself—or a palace that makes the Sultan’s court look shabby.',
    rightChoiceText:
      'Wish for an impossible palace worthy of marrying into royalty.',
    leftChoiceText:
      'Wish for a safe home for your mother, fair wages for neighbors, and no debt to repay the unseen.',
    leftConsequence:
      '“Bread steams beside honest hearths—fewer chandeliers, quieter sleep.”',
    rightConsequence:
      '“Marble multiplies—you court envy before you kiss the veil.”',
    leftDelta: { ethics: 10, wealth: -8, reputation: 12 },
    rightDelta: { ethics: -8, wealth: 12, reputation: -5 },
  },
  {
    id: 'aladdin-badroulbadour',
    voyageTitle: 'Beat 3: The Sultan’s Daughter',
    summary:
      'Princess Badroulbadour’s laughter carries over the parapets; suitors bankrupt themselves on gifts and parades.',
    dilemma:
      'You can woo her with jewels conjured wholesale… or confess you were a street rat until yesterday and ask to be judged slowly, without illusions.',
    rightChoiceText:
      'Summon silks and emeralds so vast the court falls silent.',
    leftChoiceText:
      'Present yourself plainly, risking ridicule.',
    leftConsequence:
      '“Courtiers whisper ‘brave fool’—some mean it softly.”',
    rightConsequence:
      '“Eyes widen at gemstones—truth stays unspoken beneath glitter.”',
    leftDelta: { ethics: 14, wealth: -6, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -8 },
  },
  {
    id: 'aladdin-lamp',
    voyageTitle: 'Beat 4: The Lamp',
    summary:
      'At the vault’s lowest stair, piled coin blinds the eye—but buried in soot is an old bronze lamp.',
    dilemma:
      'The magician bellows up the shaft: fetch the lamp first, then fill your sacks. You can seize the lamp alone… or snag a fistful of gold on the climb back.',
    rightChoiceText:
      'Stuff your belt with treasure first; the lamp can wait thirty breaths.',
    leftChoiceText:
      'Grip only the lamp; leave the scattering coins where they gleam.',
    leftConsequence:
      '“Smoke answers when you cling to the pact, not the shine.”',
    rightConsequence:
      '“Your belt sings with gold—and the magician snarls at delay.”',
    leftDelta: { ethics: 12, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 12, reputation: -8 },
  },
  {
    id: 'aladdin-moving-palace',
    voyageTitle: 'Beat 5: The Moved Palace',
    summary:
      'The wicked magician steals the lamp—and with it, palace, throne, princess, all uprooted overnight like a nightmare mirage.',
    dilemma:
      'The ring’s lesser djinn flickers faintly: rescue you alone to safety—or spend its last shred of power scouting where she was taken?',
    rightChoiceText:
      'Save yourself—you can bargain again when you breathe.',
    leftChoiceText:
      'Send power toward her horizon, trusting you walk into exile.',
    leftConsequence:
      '“You spend last spark on her bearing—your road tastes of dust.”',
    rightConsequence:
      '“You live to negotiate again—alone with your pulse.”',
    leftDelta: { ethics: 10, wealth: -8, reputation: 12 },
    rightDelta: { ethics: -8, wealth: 8, reputation: -8 },
  },
  {
    id: 'aladdin-vizier',
    voyageTitle: 'Beat 6: The Vizier’s Shadow',
    summary:
      'The Grand Vizier whispers poison in the Sultan’s ear: common blood, unnatural luck, djinn bargains not fit for a dynasty.',
    dilemma:
      'Agents offer you forged letters that ruin the Vizier overnight—or you can endure the rumor storm and plead only with truth before the Sultan.',
    rightChoiceText:
      'Let the forged scandal spread; destroy him before he destroys you.',
    leftChoiceText:
      'Reject forgery—face trial with lawful words only.',
    leftConsequence:
      '“Ink stays clean—even when your knees don’t.”',
    rightConsequence:
      '“Scandal blossoms overnight—hands you cannot see applaud.”',
    leftDelta: { ethics: 12, wealth: -5, reputation: 8 },
    rightDelta: { ethics: -12, wealth: 6, reputation: -10 },
  },
  {
    id: 'aladdin-ambush',
    voyageTitle: 'Beat 7: The Poisoned Peach',
    summary:
      'Disguised as a hawker on the roadside, Aladdin’s enemy offers the princess a peach sugared so sweet death hides beneath the skin.',
    dilemma:
      'You could strike first with the genie—a storm that erases stall, seller, witnesses—or warn the courtyard and gamble that she refuses the bait.',
    rightChoiceText:
      'Command the lamp to scour the plaza—no peach, no hawk, no risk.',
    leftChoiceText:
      'Warn loudly; let crowd and guards decide what erupts.',
    leftConsequence:
      '“Chaos billows—innocents scatter, but she sees your face first.”',
    rightConsequence:
      '“Wind erases the stall—rumor names you executioner after.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 12 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -12 },
  },
  {
    id: 'aladdin-genie-fate',
    voyageTitle: 'Beat 8: The Last Bargain',
    summary:
      'With the magician broken, two lamps remain—but one spirit begs imprisonment over endless servitude.',
    dilemma:
      'Grant the djinn lawful release—or keep a tether of wishes for days when famine returns to Baghdad.',
    rightChoiceText:
      'Seal a final wish of dominion—“serve when I summon.”',
    leftChoiceText:
      'Grant freedom and swear never to crave another captive star.',
    leftConsequence:
      '“The smoke thins into stars no one commands.”',
    rightConsequence:
      '“A collar of wishes remains—polished, obedient, hungry.”',
    leftDelta: { ethics: 14, wealth: -8, reputation: 12 },
    rightDelta: { ethics: -12, wealth: 10, reputation: -8 },
  },
]
