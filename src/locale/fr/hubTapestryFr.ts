import { ADVENTURE_ORDER } from '../../data/adventureConfig'
import type { HubTapestryCopy, TaleCompletionSummary } from '../../utils/anthologyHubTypes'

function avg(values: number[]): number {
  if (values.length === 0) return 50
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

/** French hub tapestry copy — mirrors `buildHubTapestryCopy` logic for `locale === 'fr'`. */
export function buildHubTapestryCopyFr(summaries: TaleCompletionSummary[]): HubTapestryCopy {
  const n = summaries.length

  if (n === 0) {
    return {
      headline: 'Votre registre à travers les nuits',
      tagline: 'Chaque récit terminé laisse une trace ici.',
      portrait:
        'Jouez un récit jusqu’à sa fin : quand vous reviendrez dans cette salle, votre issue apparaîtra dans la rangée ci-dessous. Terminez les trois voyages et la tapisserie vous nommera comme un même lecteur à travers Sindbad, Aladin et le Cheval d’ébène.',
    }
  }

  if (n === 1) {
    const s = summaries[0]
    return {
      headline: 'Votre registre à travers les nuits',
      tagline: 'Un voyage a parlé ; les autres écoutent encore.',
      portrait: `Pour l’instant les nuits vous connaissent surtout à travers **${s.gameTitle}** — « ${s.endingTitle} » (${s.endingId}). Cette seule fin est déjà un visage dans la mosaïque ; quand vous aurez bouclé les deux autres récits, ce mur tressera les trois en une seule phrase qui dira, en toute simplicité, qui vous étiez lorsque Shéhérazade vous tendit la plume.`,
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
        ? 'Sur ces deux parcours, vos choix vers la gauche l’emportent sur la droite — pitié et retenue ont devancé marché et saisie.'
        : merc > comp
          ? 'Sur ces deux parcours, la voie de droite a dominé — marché, audace ou avidité mercantile ont parlé plus fort que la gauche.'
          : 'Sur ces deux parcours vous avez partagé les flèches à égalité — deux mythes différents, une même main sur la balance.'

    return {
      headline: 'Votre registre à travers les nuits',
      tagline: 'Deux récits bouclés ; le troisième attend encore.',
      portrait: `**${a.gameTitle}** s’est clos sur « ${a.endingTitle} » ; **${b.gameTitle}** s’est clos sur « ${b.endingTitle} ». Moyennées entre les deux, vos mesures se situent vers **Éthique ${ae}**, **Fortune ${aw}**, **Réputation ${ar}**. ${lean} Finissez la dernière nuit et la ligne ci-dessous devient un seul verdict : vous à travers toute l’anthologie.`,
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

  const weave = `${st.gameTitle} : « ${st.endingTitle} » · ${al.gameTitle} : « ${al.endingTitle} » · ${ho.gameTitle} : « ${ho.endingTitle} ».`

  const voice =
    compPct >= 58
      ? 'Vingt-quatre choix, et le côté boussole a souvent gagné — mer, lampe et ciel ont entendu la même allure patiente.'
      : compPct <= 42
        ? 'Vingt-quatre choix, et le côté marché a pris le rythme — chaque récit vous a laissé saisir un trône d’une autre espèce.'
        : 'Vingt-quatre choix partagés sans tyran : aucune flèche ne possède l’anthologie ; vous avez essayé trois tonalités morales dans la même main.'

  return {
    headline: 'C’est vous à travers les nuits',
    tagline: 'Trois voyages bouclés — un seul registre.',
    portrait: `${weave} Moyenné sur chaque fin, votre encre se pose vers **Éthique ${ethics}**, **Fortune ${wealth}**, **Réputation ${reputation}**. ${voice} Si un étranger demandait qui vous êtes après le quart de Shéhérazade, vous pourriez lui tendre cette bande : non un seul récit, mais le **mélange** des trois — et les mesures prouvent que vous avez voulu dire chaque bifurcation.`,
  }
}
