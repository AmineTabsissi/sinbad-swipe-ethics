import type { Scenario } from '../../types'

export const scenariosEbonyHorseFr: Scenario[] = [
  {
    id: 'horse-inventors-hall',
    voyageTitle: 'Temps 1 : le don des inventeurs',
    summary:
      'Dans une cour persane étincelante, un artisan indien dévoile un cheval d’ébène incrusté de joyaux — il s’élève au ciel sans bride ni avoine.',
    dilemma:
      'Le sultan vous presse, prince, de dire miracle ou mécanique. Dire la vérité du métier peut livrer l’artisan à l’envie — ou faire passer votre cour pour des rêveurs idolâtres.',
    rightChoiceText:
      'Louer la foi aveugle et les présages — « un don tombé d’invisibles mains ».',
    leftChoiceText:
      'Louer l’ingéniosité — créditer charpentiers, gonds, engrenages, audace.',
    leftConsequence: '« Tu élèves l’artifice sur le mythe — l’envie se réveille, mais l’atelier bat le cœur. »',
    rightConsequence: '« La cour s’agenouille plus vite quand le prodige reste aveugle. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 12 },
    rightDelta: { ethics: -8, wealth: 8, reputation: -10 },
  },
  {
    id: 'horse-stolen-mount',
    voyageTitle: 'Temps 2 : la monture volée',
    summary:
      'Votre cadet bondit sur le piédestal, actionne les goupilles secrètes et disparaît dans les airs tandis que les courtiers se protègent du sable fouetté.',
    dilemma:
      'Le dénoncer comme voleur devant le sultan offensé — ou endosser la faute d’aîné jusqu’à récupérer cheval et paix.',
    rightChoiceText:
      'Le nommer publiquement pour sauver votre peau diplomatique.',
    leftChoiceText:
      'Supplier du temps pour le ramener en secret et restaurer la dignité.',
    leftConsequence: '« Tu avales la faute d’un chaos qui n’est pas tout à tien. »',
    rightConsequence: '« Tu gardes les robes propres — le sang n’est plus qu’à lui. »',
    leftDelta: { ethics: 8, wealth: -8, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -8 },
  },
  {
    id: 'horse-yemen-parapet',
    voyageTitle: 'Temps 3 : la princesse au-dessus du Yémen',
    summary:
      'D’une hauteur impossible vous entrevoyez le Yémen en terrasses : une princesse sur un parapet répète des hymnes au crépuscule pendant que les gardes croient qu’aux nuages seuls appartient cette altitude.',
    dilemma:
      'Glisser en promettant de revenir — ou descendre ce soir au risque de la guerre pour un battement de cœur.',
    rightChoiceText:
      'Descendre près de ses appartements avant l’aube — voler l’introduction aux nuages.',
    leftChoiceText:
      'Graver sa fenêtre en mémoire ; se retirer et envoyer des émissaires légaux vers les hauteurs.',
    leftConsequence: '« Le devoir retarde le désir — les tambours de guerre se taisent une semaine de plus. »',
    rightConsequence: '« Les cœurs se heurtent avant que les diplomates n’ouvrent l’encrier. »',
    leftDelta: { ethics: 14, wealth: -6, reputation: 8 },
    rightDelta: { ethics: -12, wealth: 10, reputation: -6 },
  },
  {
    id: 'horse-king-furious',
    voyageTitle: 'Temps 4 : le roi qui voit des ombres',
    summary:
      'Son père entrevoit des silhouettes suspendues ; la trahison bat avant qu’on sache ce qui volait.',
    dilemma:
      'Ranimer son affection par la terreur aérienne — ou apparaître désarmé devant le trône, au risque des chaînes plutôt que du bombardement.',
    rightChoiceText:
      'Survoler la place à midi — les foules s’agenouillent plus vite que ne parlent les diplomates.',
    leftChoiceText:
      'Atterrir volontairement, déposer la dague, invoquer le droit d’hôte.',
    leftConsequence: '« Les chaînes tintent poliment — ta voix reste humaine. »',
    rightConsequence: '« La terreur plie les genoux ; les traités claquent comme du petit bois. »',
    leftDelta: { ethics: 12, wealth: -8, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 8, reputation: -12 },
  },
  {
    id: 'horse-flight-home',
    voyageTitle: 'Temps 5 : le vent à deux corps',
    summary:
      'La selle se resserre — il faut porter deux âmes sur des alliages jamais pensés pour le poids de l’amour.',
    dilemma:
      'Alléger — jeter les voiles cousues de perles d’héritage — ou quitter la cape de mailles d’or qui vous marque prince.',
    rightChoiceText:
      'Jeter le haubert de cérémonie — préserver ses jetons de lignage.',
    leftChoiceText:
      'Jeter l’or de cérémonie — garder l’acier qui pourrait défendre l’atterrissage.',
    leftConsequence: '« Les perles tombent comme la neige — tu atterris plus lourd d’honneur que de pièces. »',
    rightConsequence: '« Tu gardes ses armoiries flamboyantes — au prix des bleus à l’atterrissage. »',
    leftDelta: { ethics: -5, wealth: -10, reputation: 8 },
    rightDelta: { ethics: 5, wealth: 8, reputation: -5 },
  },
  {
    id: 'horse-brothers-enmity',
    voyageTitle: 'Temps 6 : le festin de couteaux derrière les sourires',
    summary:
      'Le retour devrait couronner — au lieu de quoi les conseillers murmurent la succession, les cousins convoitent le cheval.',
    dilemma:
      'Partager le trône pour la quiétude — ou durcir la loi pour que seuls les héritiers indiscutés touchent les clefs du trésor.',
    rightChoiceText:
      'Fusionner les titres avec des rentes généreuses — « partager l’ascension ».',
    leftChoiceText:
      'Exposer chaque complot — même le sang — avant de prêter de nouveaux serments.',
    leftConsequence: '« La salle sent le fer de l’honnêteté — certaines chaises restent vides pour toujours. »',
    rightConsequence: '« Tu troques les titres contre une paix fragile cousue de pensions. »',
    leftDelta: { ethics: -5, wealth: -8, reputation: 10 },
    rightDelta: { ethics: 6, wealth: 6, reputation: -8 },
  },
  {
    id: 'horse-peoples-trial',
    voyageTitle: 'Temps 7 : l’enquête sur la place du marché',
    summary:
      'Les rumeurs courent : sorcellerie, enlèvement, princesses volées aux étoiles. Les juges exigent le spectacle.',
    dilemma:
      'Dévoiler le miracle d’ébène aux foules — ou raconter un amour maladroit de mortels sans conjurer l’effroi des pèlerins.',
    rightChoiceText:
      'Voler en huit au-dessus jusqu’à ce que l’émerveillement taise les sceptiques.',
    leftChoiceText:
      'Parler depuis le sol ; laisser le cheval froid et muet.',
    leftConsequence: '« Les sceptiques mâchent tes mots — ils ne trouvent pas de miracle, seulement la sueur mortelle. »',
    rightConsequence: '« La place rugit — tu gagnes la foule et convoques de nouvelles peurs. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 14 },
    rightDelta: { ethics: -8, wealth: 8, reputation: -10 },
  },
  {
    id: 'horse-last-switch',
    voyageTitle: 'Temps 8 : la goupille que nul n’enseigne',
    summary:
      'Vous apprenez enfin quels clous inversent la montée — et la chute : pas tout cavalier mérite cette grammaire.',
    dilemma:
      'Briser les commandes pour qu’aucun tyran ne monte — ou archiver l’instruction sous sceau pour les héritiers dignes de confiance ?',
    rightChoiceText:
      'Sceller les plans seulement pour les descendants couronnés.',
    leftChoiceText:
      'Rompre le mécanisme d’ascension — disperser les pièces aux forgerons anonymement.',
    leftConsequence: '« Nul ne possède plus l’évasion verticale — liberté et péril partagent le vent. »',
    rightConsequence: '« Tu couronnes des héritiers — et de futurs tyrans. »',
    leftDelta: { ethics: 12, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -6, wealth: 8, reputation: -5 },
  },
]
