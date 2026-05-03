import type { Scenario } from '../../types'

export const scenariosSinbadFr: Scenario[] = [
  {
    id: 'voyage-1-whale-island',
    voyageTitle: 'Voyage 1 : l’île-baleine',
    summary:
      'Sinbad et son équipage prennent une baleine géante endormie pour une île ; en allumant un feu, la bête plonge et Sinbad se retrouve seul en mer. Des hommes d’un roi le sauvent ; son navire d’origine finit par le retrouver au port.',
    dilemma:
      'Quand l’« île » tremble et que l’équipage panique, Sinbad voit un vieux marin plus lent qui n’atteindra pas le canot de sauvetage, tandis que son lourd registre et sa bourse glissent vers les flots.',
    rightChoiceText:
      'Saisir registre et bourse, sécuriser sa fortune et plonger vers le canot en laissant le vieil homme.',
    leftChoiceText:
      'Lâcher son or à la mer et à deux mains traîner le marin vers l’eau avec lui, au risque des deux vies.',
    rightConsequence: '« Tu vis avec ton or, mais le vieil homme se noie dans l’ombre. »',
    leftConsequence: '« Tu paries ta sécurité pour une autre vie. »',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-2-valley-diamonds',
    voyageTitle: 'Voyage 2 : la vallée de diamants',
    summary:
      'Abandonné sur une île, Sinbad s’attache à la patte d’un roc géant qui le laisse tomber dans une vallée de diamants gardée par d’immenses serpents. Il s’enfuit en s’attachant à une viande pour qu’un aigle l’emporte vers son nid.',
    dilemma:
      'Les marchands qui le tirent du nid veulent les gemmes selon les règles de leur guilde. Les poches de Sinbad débordent des plus grosses pierres du monde.',
    rightChoiceText:
      'Donner un diamant modeste aux sauveteurs et garder le reste pour rebâtir son empire à Bagdad.',
    leftChoiceText:
      'Partager équitablement les plus grandes pierres avec les marchands pauvres qui l’ont sauvé, même au prix de sa fortune.',
    rightConsequence: '« Tu paies le minimum et gardes le trésor. »',
    leftConsequence: '« Tu partages la manne avec ceux qui t’ont tiré du vide. »',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-3-isle-cyclops',
    voyageTitle: 'Voyage 3 : l’île du Cyclope',
    summary:
      'Naufragés, Sinbad et les siens sont enfermés par un cyclope cannibale qui dévore les plus corpulents. Les survivants l’aveuglent avec des broches rouges et fuient sur des radeaux.',
    dilemma:
      'Avant le plan, pendant le sommeil du géant, Sinbad remarque une fente dans le mur, juste assez large pour une personne.',
    rightChoiceText:
      'Se glisser dans la fente en silence, sauver sa peau et laisser l’équipage terrorisé au repas du géant.',
    leftChoiceText:
      'Rester, risquer d’être le prochain plat, et rallier l’équipage figé pour forger ensemble les broches ardentes.',
    rightConsequence: '« Tu t’échappes seul et laisses les autres au destin. »',
    leftConsequence: '« Tu choisis la solidarité et une fuite collective. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -10 },
  },
  {
    id: 'voyage-4-underground-tomb',
    voyageTitle: 'Voyage 4 : la tombe souterraine',
    summary:
      'Devenu riche et marié, Sinbad est enseveli vivant selon la loi locale avec le corps de sa femme. Il survit en frappant d’autres conjoints récemment ensevelis pour voler leurs maigres vivres jusqu’à trouver une sortie.',
    dilemma:
      'Une pierre se soulève : on descend une veuve en pleurs avec une cruche d’eau et sept pains dans le noir absolu.',
    rightChoiceText:
      'Frapper la veuve dans le noir et prendre ses vivres pour garder des forces et chercher la sortie.',
    leftChoiceText:
      'Sortir de l’ombre, partager ses dernières gouttes, la consoler et chercher ensemble une issue, au prix de la faim pour deux.',
    rightConsequence: '« Tu prends ce qu’il faut pour vivre, au prix brutal d’une autre. »',
    leftConsequence: '« Tu choisis la compagnie plutôt que la certitude. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-5-old-man-sea',
    voyageTitle: 'Voyage 5 : le vieillard de la mer',
    summary:
      'Sinbad porte un vieillard fragile à travers un gué ; l’être verrouille ses jambes de fer autour de son cou et l’asservit. Il s’échappe en faisant fermenter des raisins, enivrant le monstre et l’écrasant.',
    dilemma:
      'En cueillant des fruits, il voit un autre marin courbé sous un autre fardeau. Sa gourde de vin secret est prête.',
    rightChoiceText:
      'Garder le vin pour soi : impliquer l’autre augmente le risque que le Vieillard comprenne et étrangle.',
    leftChoiceText:
      'Glisser la gourde à l’autre marin pour tenter une évasion coordonnée derrière le dos des monstres.',
    rightConsequence: '« Tu réduis le risque mais abandonnes un compagnon de chaîne. »',
    leftConsequence: '« Tu risques tout pour une fuite partagée. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -10 },
  },
  {
    id: 'voyage-6-river-precious-stones',
    voyageTitle: 'Voyage 6 : la rivière de pierres précieuses',
    summary:
      'Sur une pente abrupte, les compagnons meurent de faim un à un. Sinbad construit un radeau, descend une rivière souterraine et émerge au royaume utopique de Serendib.',
    dilemma:
      'Les vivres sont épuisés. Le dernier survivant, son ancien capitaine, agonise et le supplie de réciter ses prières finales, tandis que la plage est couverte d’ambre gris et de rubis à charger avant la marée.',
    rightChoiceText:
      'Ignorer le capitaine et charger le radeau de joyaux avant que la marée emporte tout.',
    leftChoiceText:
      'Renoncer au trésor, tenir la main du mourant, puis partir dans le noir avec seulement ses habits.',
    rightConsequence: '« Tu sécurises l’or mais refuses la dernière douceur. »',
    leftConsequence: '« Tu honores les mourants et acceptes la rudesse. »',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'voyage-7-elephant-graveyard',
    voyageTitle: 'Voyage 7 : le cimetière d’éléphants',
    summary:
      'Réduit en esclavage, Sinbad doit tirer sur les éléphants depuis un arbre. La harde déracine son arbre et l’emmène à leur cimetière secret : ils lui donneront l’ivoire s’il cesse de tuer.',
    dilemma:
      'De retour chez son maître, celui-ci promet liberté, navire et fortune s’il révèle l’emplacement — mais des marchands avides profaneront le lieu sacré.',
    rightChoiceText:
      'Révéler l’emplacement, acheter sa liberté et rentrer à Bagdad couvert d’or.',
    leftChoiceText:
      'Refuser de trahir le lieu sacré et accepter l’esclavage brutal pour protéger la harde.',
    rightConsequence: '« Tu achètes la liberté en vendant une confiance sacrée. »',
    leftConsequence: '« Tu restes fidèle au troupeau au prix terrible de toi-même. »',
    leftDelta: { ethics: 10, wealth: -10, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 10, reputation: -10 },
  },
  {
    id: 'bonus-sultan-samarkand',
    voyageTitle: 'Bonus : le sultan de Samarcande (cadre)',
    summary:
      'Le roi Chah Zaman, traumatisé après l’exécution de sa femme infidèle, visite son frère Chahryar et surprend secrètement la reine dans une orgie avec des esclaves du palais.',
    dilemma:
      'Vous détenez un secret qui peut détruire votre frère : lui dire la vérité sur la reine et risquer le chaos de l’empire, ou vous taire ?',
    rightChoiceText:
      'Se taire, préserver votre place de hôte royal et la stabilité politique du royaume.',
    leftChoiceText:
      'Dire la vérité douloureuse à votre frère, choisir l’amour fraternel plutôt que la sécurité du royaume (amorçant les Mille et Une Nuits).',
    rightConsequence: '« Tu préserverais l’ordre, mais le secret te ronge. »',
    leftConsequence: '« Tu choisis l’honnêteté et acceptes la tempête. »',
    leftDelta: { ethics: 10, wealth: -5, reputation: 10 },
    rightDelta: { ethics: -10, wealth: 5, reputation: -10 },
  },
]
