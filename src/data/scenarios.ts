import type { Scenario } from '../types'

export const scenarios: Scenario[] = [
  {
    id: 'voyage-1-whale-island',
    voyageTitle: 'Voyage 1: The Whale Island',
    summary:
      'Sinbad and his crew mistake a giant sleeping whale for an island, and when they light a fire, the beast dives, leaving Sinbad stranded in the ocean. He is rescued by a king\'s men and eventually recovers his lost cargo when his original ship miraculously arrives in port.',
    dilemma:
      'As the "island" begins to quake and the crew scrambles in terror, Sinbad notices a slower, older crewmate struggling to reach the lifeboat, but Sinbad\'s heavy, valuable ledger and purse are slipping into the sea.',
    rightChoiceText:
      'Grab your ledger and purse, securing your financial future, and jump for the lifeboat, leaving the old man behind.',
    leftChoiceText:
      'Abandon your wealth to the sea and use both hands to drag the struggling crewmate into the water with you, risking both your lives.',
    rightConsequence: '“You survive with your wealth, but the old man is lost.”',
    leftConsequence: '“You gamble your safety to save another life.”',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-2-valley-diamonds',
    voyageTitle: 'Voyage 2: The Valley of Diamonds',
    summary:
      "Accidentally left behind on a deserted island, Sinbad escapes by tying himself to the leg of a giant Roc bird, which drops him into a valley completely covered in diamonds but guarded by massive serpents. He escapes by tying himself to a piece of meat so an eagle carries him to its nest.",
    dilemma:
      "When the local merchants rescue Sinbad from the eagle's nest, they expect to claim the diamonds from that nest as per their guild's rules. Sinbad's pockets are overflowing with the largest gems the world has ever seen.",
    rightChoiceText:
      "Hand the rescuing merchant a single, modestly sized diamond, hoarding the vast fortune to rebuild your own empire back in Baghdad.",
    leftChoiceText:
      'Divide your largest, most priceless diamonds equally among the poor merchants who saved you, significantly cutting your own profits.',
    rightConsequence:
      '“You pay the minimum, keeping the fortune for yourself.”',
    leftConsequence:
      '“You share the windfall with those who saved you.”',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-3-isle-cyclops',
    voyageTitle: 'Voyage 3: The Isle of the Cyclops',
    summary:
      'Shipwrecked on an island, Sinbad and his companions are trapped in a castle by a monstrous, cannibalistic, one-eyed giant who begins eating the fattest crew members. The survivors manage to blind the giant with red-hot spits and flee on rafts.',
    dilemma:
      'Before the blinding plan is formed, while the giant sleeps, Sinbad discovers a narrow crevice in the castle wall just big enough for one person to squeeze through.',
    rightChoiceText:
      'Slip away silently through the crevice, ensuring your own survival while leaving your terrified crew to be eaten.',
    leftChoiceText:
      "Stay, risk being the giant's next meal, and rally the paralyzed crew to forge the red-hot spits together.",
    rightConsequence:
      '“You escape alone, leaving the others to their fate.”',
    leftConsequence:
      '“You choose solidarity and plan a collective escape.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -10 },
  },
  {
    id: 'voyage-4-underground-tomb',
    voyageTitle: 'Voyage 4: The Underground Tomb',
    summary:
      "After gaining extreme wealth and marrying a local noblewoman, Sinbad's wife dies, and he falls victim to a horrific local law: he is buried alive in a mass cavern with her corpse and a meager ration of bread and water. He survives by ruthlessly bludgeoning other newly buried spouses and stealing their rations until he finds a tunnel out.",
    dilemma:
      'A heavy stone rolls back, and a newly widowed woman is lowered into the pitch-black crypt, weeping, with a fresh jug of water and seven loaves of bread.',
    rightChoiceText:
      'Strike the widow in the dark with a bone and steal her rations so you have the strength and time to find an exit.',
    leftChoiceText:
      'Step out of the shadows, share your last drops of water to comfort her, and vow to search for a way out together, risking starvation for both of you.',
    rightConsequence:
      '“You take what you need to survive, at a brutal cost.”',
    leftConsequence:
      '“You choose companionship over certainty.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-5-old-man-sea',
    voyageTitle: 'Voyage 5: The Old Man of the Sea',
    summary:
      'Sinbad takes pity on a frail old man and offers to carry him across a stream, but the creature locks his iron-grip legs around Sinbad’s neck, enslaving him as a human beast of burden. Sinbad eventually escapes by fermenting wild grapes into wine, getting the monster drunk, and crushing him.',
    dilemma:
      'While gathering fruit, Sinbad spots another enslaved sailor staggering under the weight of a different monster. Sinbad has just finished fermenting his secret gourd of wine.',
    rightChoiceText:
      'Keep the wine strictly to yourself. Involving the other sailor increases the risk of the Old Man catching on and strangling you.',
    leftChoiceText:
      'Risk passing the wine gourd to the other sailor behind the monsters\' backs so you can both attempt a coordinated escape.',
    rightConsequence:
      '“You reduce risk, but abandon someone in the same chains.”',
    leftConsequence:
      '“You risk everything for a shared escape.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -10 },
  },
  {
    id: 'voyage-6-river-precious-stones',
    voyageTitle: 'Voyage 6: The River of Precious Stones',
    summary:
      "Stranded on a sheer mountain slope, Sinbad's companions slowly starve to death one by one. Sinbad builds a raft and navigates a treacherous, pitch-black underground river, emerging in the utopian kingdom of Serendib.",
    dilemma:
      "You are building your raft, and provisions are entirely gone. The last surviving crew member, your former captain, is dying and begs you to sit with him and recite his final prayers. However, the beach is covered in loose ambergris and rubies that need to be loaded onto the raft before the tide turns.",
    rightChoiceText:
      "Ignore the dying captain's pleas and furiously load your raft with as much treasure as it can hold before the tide sweeps it away.",
    leftChoiceText:
      "Forgo the treasure entirely. Hold the captain's hand in his final moments, and set sail into the dark cave with nothing but the clothes on your back.",
    rightConsequence:
      '“You secure riches, but deny a final kindness.”',
    leftConsequence:
      '“You honor the dying, and accept hardship.”',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-7-elephant-graveyard',
    voyageTitle: 'Voyage 7: The Elephant Graveyard',
    summary:
      'Captured by pirates and sold into slavery, Sinbad is forced by his master to shoot elephants for their ivory from the safety of a tree. The angry herd eventually uproots his tree and carries him to their secret graveyard, showing him they will freely give him ivory if he stops killing them.',
    dilemma:
      'You return to your master with the news. He promises you immediate freedom, a ship, and immense wealth if you guide him back to the graveyard. However, you know the greedy merchants will likely desecrate the sacred burial ground and exploit the herd.',
    rightChoiceText:
      'Reveal the location to your master, securing your freedom and a massive payout to return to Baghdad in glory.',
    leftChoiceText:
      "Refuse to betray the elephants' sacred ground, accepting continued, grueling enslavement to protect the majestic creatures.",
    rightConsequence:
      '“You buy freedom by selling out a sacred trust.”',
    leftConsequence:
      '“You keep faith with the herd, at terrible personal cost.”',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'bonus-sultan-samarkand',
    voyageTitle: 'Bonus Level: The Sultan of Samarkand (The Frame Story)',
    summary:
      'King Shah Zaman (the Sultan of Samarkand) is traumatized after executing his unfaithful wife. While visiting his older brother, the mighty King Shahryar, he secretly witnesses Shahryar’s queen engaging in a wild affair with the palace slaves.',
    dilemma:
      'You hold a secret that will destroy your brother\'s life. Do you tell him the truth about his queen, knowing it will shatter his mind and potentially plunge his massive empire into bloody chaos, or do you stay silent?',
    rightChoiceText:
      'Keep quiet. Protect your own comfortable position as a royal guest and ensure the political stability of the empire remains intact.',
    leftChoiceText:
      'Tell your brother the agonizing truth, choosing loyalty and brotherly love over the safety of the realm (triggering the events of the 1001 Nights).',
    rightConsequence:
      '“You preserve stability, but live with the secret.”',
    leftConsequence:
      '“You choose honesty, and accept the fallout.”',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -10 },
  },
]