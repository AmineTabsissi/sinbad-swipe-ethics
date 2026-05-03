import type { Scenario } from '../../types'

export const scenariosAladdinFr: Scenario[] = [
  {
    id: 'aladdin-ring-cave',
    voyageTitle: 'Temps 1 : l’anneau et la caverne',
    summary:
      'Un magicien déguisé mène le jeune Aladdin dans une caverne d’or défendue ; l’échappée exige l’obéissance plutôt que la cupidité.',
    dilemma:
      'Avant la descente, sa mère lui glisse son seul héritage : un anneau d’argent terni dit-on protecteur. Le magicien ricane — il veut la soumission, pas le sentiment.',
    rightChoiceText:
      'Laisser l’anneau à sa mère pour prouver qu’il fait confiance au plan et voyager léger.',
    leftChoiceText:
      'Porter l’anneau tout de même — il se sent plus en sécurité avec sa bénédiction au doigt.',
    rightConsequence: '« Tu parais docile, mais tu descends sans armure sentimentale. »',
    leftConsequence: '« Tu risques la colère du mage, mais refuses tout réconfort perdu. »',
    leftDelta: { ethics: 8, wealth: -5, reputation: 8 },
    rightDelta: { ethics: -8, wealth: 10, reputation: -5 },
  },
  {
    id: 'aladdin-palace',
    voyageTitle: 'Temps 2 : le vœu du palais',
    summary:
      'Le génie de la lampe offre la splendeur : cours de marbre, bassins de saphir, armées de serviteurs invisibles — en une nuit.',
    dilemma:
      'Demander un modeste confort pour sa mère et un travail honnête — ou un palais qui éclipse la cour du sultan.',
    rightChoiceText:
      'Souhaiter un palais impossible, digne d’épouser la royauté.',
    leftChoiceText:
      'Souhaiter un foyer sûr pour sa mère, des salaires justes pour les voisins, et aucune dette envers l’invisible.',
    leftConsequence: '« Le pain fume près des foyers honnêtes — moins de lustres, plus de sommeil calme. »',
    rightConsequence: '« Le marbre se multiplie — l’envie vous précède au voile. »',
    leftDelta: { ethics: 10, wealth: -8, reputation: 12 },
    rightDelta: { ethics: -8, wealth: 12, reputation: -5 },
  },
  {
    id: 'aladdin-badroulbadour',
    voyageTitle: 'Temps 3 : la fille du sultan',
    summary:
      'La princesse Badroulbadour rit au-delà des remparts ; les prétendants se ruinent en cadeaux et parades.',
    dilemma:
      'La conquérir par des joyaux invoqués en masse… ou avouer qu’hier encore il était un gamin des rues et demander qu’on le juge lentement, sans illusion.',
    rightChoiceText:
      'Convoquer soies et émeraudes si vastes que la cour se tait.',
    leftChoiceText:
      'Se présenter simplement, au risque du ridicule.',
    leftConsequence: '« Les courtisans murmurent « brave fou » — certains le pensent doucement. »',
    rightConsequence: '« Les yeux s’écarquillent sur les gemmes — la vérité reste sous l’éclat. »',
    leftDelta: { ethics: 14, wealth: -6, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -8 },
  },
  {
    id: 'aladdin-lamp',
    voyageTitle: 'Temps 4 : la lampe',
    summary:
      'Au bas de l’escalier du caveau, les pièces aveuglent — mais dans la suie gît une vieille lampe de bronze.',
    dilemma:
      'Le magicien hurle dans le puits : la lampe d’abord, puis les sacs. Saisir seulement la lampe… ou remplir d’abord la ceinture d’or au retour.',
    rightChoiceText:
      'Remplir d’abord la ceinture de trésor ; la lampe peut attendre trente souffles.',
    leftChoiceText:
      'Ne saisir que la lampe ; laisser les pièces où elles brillent.',
    leftConsequence: '« La fumée répond quand tu tiens le pacte, pas l’éclat. »',
    rightConsequence: '« Ta ceinture chante l’or — et le mage gronde du retard. »',
    leftDelta: { ethics: 12, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 12, reputation: -8 },
  },
  {
    id: 'aladdin-moving-palace',
    voyageTitle: 'Temps 5 : le palais déraciné',
    summary:
      'Le mage vole la lampe — et avec elle palais, trône, princesse, tout arraché en une nuit comme un mirage cauchemardesque.',
    dilemma:
      'Le génie modeste de l’anneau vacille : te sauver seul — ou brûler sa dernière lueur à chercher où elle a été emmenée ?',
    rightChoiceText:
      'Te sauver — tu marchandereas quand tu respireras.',
    leftChoiceText:
      'Envoyer le pouvoir vers son horizon, en acceptant l’exil.',
    leftConsequence: '« Tu consumes la dernière étincelle pour elle — ta route a le goût de la poussière. »',
    rightConsequence: '« Tu vis pour renégocier — seul avec ton pouls. »',
    leftDelta: { ethics: 10, wealth: -8, reputation: 12 },
    rightDelta: { ethics: -8, wealth: 8, reputation: -8 },
  },
  {
    id: 'aladdin-vizier',
    voyageTitle: 'Temps 6 : l’ombre du vizir',
    summary:
      'Le grand vizir murmure poison à l’oreille du sultan : sang populaire, chance impie, marchés de djinn indignes d’une dynastie.',
    dilemma:
      'Des agents proposent des lettres forgées qui ruinent le vizir en une nuit — ou endurer la rumeur et ne plaider que la vérité devant le sultan.',
    rightChoiceText:
      'Laisse courir le faux scandale ; le détruire avant qu’il ne vous détruise.',
    leftChoiceText:
      'Rejeter la forge — affronter le procès avec des mots de loi seuls.',
    leftConsequence: '« L’encre reste propre — même quand les genoux tremblent. »',
    rightConsequence: '« Le scandale fleurit la nuit — des mains invisibles applaudissent. »',
    leftDelta: { ethics: 12, wealth: -5, reputation: 8 },
    rightDelta: { ethics: -12, wealth: 6, reputation: -10 },
  },
  {
    id: 'aladdin-ambush',
    voyageTitle: 'Temps 7 : la pêche empoisonnée',
    summary:
      'Déguisé en colporteur, l’ennemi d’Aladdin offre à la princesse une pêche si sucrée que la mort s’y cache.',
    dilemma:
      'Frapper d’abord avec le génie — une tempête qui efface étal, vendeur, témoins — ou avertir la cour et parier qu’elle refuse l’appât.',
    rightChoiceText:
      'Ordonner à la lampe de balayer la place — plus de pêche, plus de risque.',
    leftChoiceText:
      'Crier l’alerte ; laisser foule et gardes décider de l’explosion.',
    leftConsequence: '« Le chaos gonfle — les innocents fuient, mais elle voit d’abord ton visage. »',
    rightConsequence: '« Le vent efface l’étal — la rumeur te nomme bourreau. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 12 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -12 },
  },
  {
    id: 'aladdin-genie-fate',
    voyageTitle: 'Temps 8 : le dernier marché',
    summary:
      'Le magicien brisé, deux lampes subsistent — mais un esprit supplie la prison plutôt qu’une servitude sans fin.',
    dilemma:
      'Accorder une libération légale — ou garder un fil de vœux pour les jours où la famine reviendra sur Bagdad.',
    rightChoiceText:
      'Sceller un dernier vœu de domination : « sers quand je convoque. »',
    leftChoiceText:
      'Accorder la liberté et jurer de ne plus jamais convoiter d’étoile captive.',
    leftConsequence: '« La fumée se rarefie en étoiles que nul ne commande. »',
    rightConsequence: '« Un collier de vœux demeure — poli, obéissant, affamé. »',
    leftDelta: { ethics: 14, wealth: -8, reputation: 12 },
    rightDelta: { ethics: -12, wealth: 10, reputation: -8 },
  },
]
