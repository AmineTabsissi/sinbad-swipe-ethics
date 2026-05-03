import type { AdventureId } from '../../types'
import type { LegacyKey, WealthKey } from '../../utils/endings'

export const WEALTH_LABEL_FR: Record<WealthKey, string> = {
  humble: 'Modeste',
  comfortable: 'Aisé',
  legendary: 'Légendaire',
}

export const LEGACY_TITLE_FR: Record<AdventureId, Record<LegacyKey, string>> = {
  sinbad: {
    shrewd: 'Opportuniste maudit',
    balanced: 'Voyageur équilibré',
    moral: 'Voyageur moral',
  },
  aladdin: {
    shrewd: 'Comptable de minuit',
    balanced: 'Équilibre sous la lampe',
    moral: 'Libérateur de vœux',
  },
  horse: {
    shrewd: 'Tyran des thermiques',
    balanced: 'Souverain des deux silences',
    moral: 'Intendant de l’ascension',
  },
}

export const EPILOGUE_CELL_FR: Record<AdventureId, Record<LegacyKey, Record<WealthKey, string>>> = {
  sinbad: {
    shrewd: {
      humble:
        'La mer vous paya en sel et en ruse, pas en pièces ; vous rentrez maigre, registres serrés, ponts frottés par un équipage qui respectait vos marchés plus que votre pitié. Les ports comptent encore ce que vous prîtes — et ce que vous refusiez d’appeler bonté quand ce n’était que levier.',
      comfortable:
        'Les cargaisons montèrent et descendirent, mais l’instinct resta mercantile : vous rebâtîtes des coques à la marge et une réputation sur la rumeur. On vous dit fiable comme l’acier — brillant, utile, jamais confondu avec la mollesse.',
      legendary:
        'Des richesses étranges remplirent la cale pendant que les coursives se vidaient de murmures ; vous gagniez chaque enchère et presque chaque dispute. Les sept mers inscrivent votre nom là où la charité eût inscrit un visage — et l’écart vous tient éveillé par beau temps.',
    },
    balanced: {
      humble:
        'Vous traversâtes le monde avec fret ordinaire et patience rare — petits profits, plus petites rancunes, repas partagés quand la chance maigrissait. Les marins vous citent comme le capitaine qui aurait pu vous extorquer et ne l’a pas fait.',
      comfortable:
        'Vos cartes mêlèrent profit et soin du port : assez d’or pour radouber deux fois, assez de retenue pour laisser les perles se reproduire. Les marchands envient l’équilibre ; les marins font confiance à l’encre.',
      legendary:
        'La fortune suivit des routes tracées au jour — droits payés, pots-de-vin refusés là où ils pourrissaient. Légendes et registres s’accordent enfin sur la même côte, et votre nom y mouille les deux.',
    },
    moral: {
      humble:
        'Vous débarquâtes avec des bourses légères et des serments lourds — la bénédiction de la veuve pèse plus que tout lingot refusé. Bassora vous retient par des histoires dites avant l’aube, non par les tarifs.',
      comfortable:
        'L’argent sert aussi souvent la soupe que le spectacle chez vous ; l’équipage reste parce que vous partagez la dureté avant le butin. Votre port résonne plus d’enfants que de criées.',
      legendary:
        'Les trésors que vous haliez fondirent en quais, écoles et secondes chances — des réserves de typhon devenues greniers. La carte vous retient comme littoral, pas comme requin, et la marée le confirme encore.',
    },
  },
  aladdin: {
    shrewd: {
      humble:
        'La fumée de la lampe se tord finement ; chaque vœu semblait un reçu à payer plus tard, pourtant la bourse resta assez honnête pour affronter votre mère. La rue garde un coin de vous que la cour n’a jamais taxé.',
      comfortable:
        'Le marbre monta pendant que les registres tremblaient — vous équilibriez le poli du palais et des dettes qu’aucun vizir n’osait lire à voix haute. Le pouvoir siège à votre table ; la confiance arrive sur des chaises plus petites, et le menu est connu des deux.',
      legendary:
        'Les salles du trône répètent des noms achetés en gros ; les djinn s’inclinent pendant que les scribes comptent des faveurs encore impayées. L’or s’empile comme un escalier — chaque marche un marché que votre jeune moi reconnaîtrait à peine.',
    },
    balanced: {
      humble:
        'Vous laissâtes assez de tapis aux voisins et assez de silence pour la dignité — des vœux assez petits pour dormir à côté. La lampe refroidit certaines nuits ; sa chaleur reste domestique, et ce fut le vœu le plus dur.',
      comfortable:
        'La cour et la cuisine apprirent votre mesure : donner l’éclat, refuser la cruauté, pourboire les deux mondes. Le jardin du sultan et le four de la ruelle reconnaissent la même main sur le loquet.',
      legendary:
        'Les palais répondent à votre signature sans tressaillir ; les marchés entendent votre charité avant vos hérauts. Pouvoir et pitié partagent désormais le même encrier, et la fumée monte droite.',
    },
    moral: {
      humble:
        'Vous troquâtes des couronnes contre du sirop contre la toux — aucun conteur ne laissera mourir la phrase. La lampe se souvient de la pitié comme du plus vif filon de métal, et de vous comme de celui qui le polissait sans avidité.',
      comfortable:
        'Les vœux financent des roues d’eau aussi souvent que des garde-robes ; les auditeurs plissent les yeux, puis donnent. La ville apprend à lire votre nom près des puits et des portes au vent, pas seulement au-dessus des portes d’airain.',
      legendary:
        'Le djinn sert de témoin, non d’arme — vous dissoutes les chaînes en contrats qui protègent les insomniaques. Lumière du jour et fumée vous nomment intendant plutôt que maître, et le registre se ferme net.',
    },
  },
  horse: {
    shrewd: {
      humble:
        'L’altitude devint alibi — vous planiez juste assez haut pour fuir la faute pendant que les dunes apprenaient votre ombre. Les ingénieurs murmurent votre nom près de schémas de peur, et la machine se souvient d’une poignée douce que vous usiez rarement.',
      comfortable:
        'Les cours applaudirent des manœuvres qu’aucun ambassadeur ne dupliquait ; les traités se effilochèrent là où votre silhouette croisait le soleil. Le cheval écoute ; les parlements tressaillent, et les chroniques débattent si c’était victoire.',
      legendary:
        'Les trônes se réarrangèrent pour capter votre remous — tribut empilé jusqu’à ressembler au temps qu’il fait. L’histoire vous classe sous orage, non sous souverain, et le ciel garde encore votre écho.',
    },
    balanced: {
      humble:
        'Vous portâtes du pain par-dessus les remparts quand la faim surpassait l’héraldique ; les flancs du cheval se souviennent d’une descente choisie plutôt que montrée. Les vents du Yémen imitent encore cette bonté sans permission.',
      comfortable:
        'Les diplomates tracent vos boucles comme courtoisie : montrer la force, atterrir doux, repartir avec des paraphes intacts. La cour et le peuple revendiquent tous deux une semaine que vous leur donnâtes, et ni l’un ni l’autre ne ment proprement.',
      legendary:
        'Le vol devint infrastructure — ponts d’air, droits sur l’effroi, ingénieurs étudiant votre pitié en plein vrilles. Le ciel paie un loyer à votre retenue, et les héritiers reçoivent plans bleus autant que frontières.',
    },
    moral: {
      humble:
        'Vous rapportâtes la couronne plus lourde de serments que de joyaux — les couloirs désapprirent l’écho de la menace. Les héritages respirent parce que vous refusâtes de les haler tout entiers, et les cousins découvrent le poids de l’air quand il est honnête.',
      comfortable:
        'Les dynasties réordonnent la succession autour de votre train d’atterrissage ; des lois tenues pour mythes prennent soudain de l’encre. Le pouvoir circule parce que vous refusâtes de thésauriser les thermiques, et la cour apprend à parler en remontées plutôt qu’en édits.',
      legendary:
        'Le cheval d’ébène repose où des enfants peuvent toucher l’alliage que vous pilotiez à travers la peur. Les légendes orbitent autour de votre refus d’être leur dieu, et les portes du musée restent entrouvertes exprès.',
    },
  },
}

export const PLAYSTYLE_FR: Record<
  AdventureId,
  { moreCompassion: string; moreMercantile: string; even: string }
> = {
  sinbad: {
    moreCompassion:
      'Sur huit temps votre livre de bord penche vers la pitié — les équipages se souviennent des ports où vous choisites la corde plutôt que la représaille, et ces ports vous envoient encore de petites faveurs à l’amarre.',
    moreMercantile:
      'Sur huit temps l’arithmétique gagna la plupart des débats à bord : chaque île retient votre marchandage avant votre hymne, et la colonne des flèches droite lit comme un second voyage.',
    even:
      'Sur huit temps vous partageâtes le vent entre pièce et conscience si équitablement qu’aucune colonne ne possède seule l’histoire — dans les tavernes on dispute laquelle fut la plus vraie, et les deux tiennent.',
  },
  aladdin: {
    moreCompassion:
      'Vos choix vers la gauche s’amassèrent comme grigris : les voisins jurent que la lampe refroidit plus vite les nuits où vous privilégiâtes la retenue, et le palais entend leur version avant la vôtre.',
    moreMercantile:
      'Vos choix vers la droite scintillèrent dans les registres — marchés empilés comme des assiettes à festin, et le djinn apprit votre appétit avant vos excuses.',
    even:
      'Pitié et marché se passèrent le relais si souvent que la fumée ne sut plus où se courber — les témoins parlent d’équilibre dangereux ; vous parlez d’une chaleur honnête.',
  },
  horse: {
    moreCompassion:
      'Honneur et vérité pesèrent plus que le spectacle dans votre décompte : les chroniques ajoutent une marge verte aux jours où vous choisîtes l’atterrissage plus doux.',
    moreMercantile:
      'Audace et emprise marquent plus de traits sur votre journal de vol — les peintres de cour noircissent le ciel sur vos portraits, pourtant les ingénieurs avouent que la machine ne mentit jamais sur votre cran.',
    even:
      'Honneur et audace frappèrent le même nombre d’étincelles ; les flancs du cheval n’oublient ni vainqueur éternel — seulement une altitude partagée entre deux bravoures.',
  },
}
