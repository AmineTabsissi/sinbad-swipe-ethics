import type { AdventureDefinition } from '../../data/adventureConfig'
import type { AdventureId } from '../../types'

/** French UI strings for tale shells (scenarios swapped separately). */
export const adventureUiFr: Record<
  AdventureId,
  Partial<
    Pick<
      AdventureDefinition,
      | 'hubTitle'
      | 'hubBlurb'
      | 'gameTitle'
      | 'gameSubtitle'
      | 'homeDescription'
      | 'leftVerb'
      | 'rightVerb'
      | 'playKeyboardHint'
      | 'mapImageAlt'
    >
  >
> = {
  sinbad: {
    hubTitle: 'Sinbad : glisser l’éthique',
    hubBlurb:
      'Huit voyages légendaires — mer, avidité, solidarité. Trois mesures scellent votre registre.',
    gameTitle: 'Sinbad : glisser l’éthique',
    gameSubtitle:
      'Huit cartes sur ordinateur : dilemmes moraux et tentation mercantile.',
    homeDescription:
      'Décidez si Sinbad privilégie le profit ou la compassion à chaque escale. Vos choix déplacent Éthique, Fortune et Réputation — et forgent votre legs.',
    leftVerb: 'Compassion',
    rightVerb: 'Mercantile',
    playKeyboardHint: 'Compassion · Mercantile',
    mapImageAlt:
      'Carte stylisée des voyages de Sinbad — de Bassora aux mers et légendes — huit étapes.',
  },
  aladdin: {
    hubTitle: 'Aladdin : le grand-livre de la lampe',
    hubBlurb:
      'Huit temps de la caverne au djinn — chaque vœu griffonné comme une dette.',
    gameTitle: 'Aladdin : le grand-livre de la lampe',
    gameSubtitle:
      'Pitié et retenue contre appétit et marché — guidés par Éthique, Fortune et Réputation.',
    homeDescription:
      'Menez Aladdin de la rue au trône. À chaque temps, cœur ou marché ; vos trois mesures forgent l’un des neuf destins.',
    leftVerb: 'Pitié · Retenue',
    rightVerb: 'Aspiration · Marché',
    playKeyboardHint: 'Retenue · Marché',
    mapImageAlt:
      'Carte panoramique du grand-livre de la lampe : sentier d’or dans la nuit du désert, huit haltes.',
  },
  horse: {
    hubTitle: 'Le cheval d’ébène : couronne des cieux',
    hubBlurb:
      'Huit temps d’un vol impossible — une machine que jalousie et cours ne peuvent ignorer.',
    gameTitle: 'Le cheval d’ébène : couronne des cieux',
    gameSubtitle:
      'L’honneur dans les hauteurs contre l’emprise du ciel — instrument, amour, dynastie.',
    homeDescription:
      'Sur les arcs de Schéhérazade. Éthique, Fortune et Réputation disent si la gloire devient légende ou catastrophe.',
    leftVerb: 'Honneur · Vérité',
    rightVerb: 'Audace · Emprise',
    playKeyboardHint: 'Honneur · Audace',
    mapImageAlt:
      'Carte céleste : constellation d’or et huit vignettes au-dessus d’une ville d’Orient.',
  },
}
