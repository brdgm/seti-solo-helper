import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import DecisionDirection from './enum/DecisionDirection'
import Action from './enum/Action'
import CardType from './enum/CardType'
import AlienSpecies from './enum/AlienSpecies'
import Planet from './enum/Planet'
import ProbeAction from './enum/ProbeAction'
import ScanSector from './enum/ScanSector'

/**
 * Solo cards
 */
const cards : Card[] = [
  // --- starter cards ---
  {
    id: 'S.1',
    cardType: CardType.STARTER,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.ANALYZE, victoryPoints: 0 },
      { action: Action.LAUNCH, publicity: 1, progress: 0 },
      { action: Action.TECH, publicityCost: 6, progress: 0 },
      { action: Action.PROBE, movementPoints: 3, planets: [Planet.SATURN, Planet.MARS, Planet.JUPITER, Planet.VENUS], probeActions: [ProbeAction.ORBITER, ProbeAction.LANDER] },
    ]
  },
  {
    id: 'S.2',
    cardType: CardType.STARTER,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.ANALYZE, victoryPoints: 0 },
      { action: Action.TECH, publicityCost: 6, progress: 0 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.CARD, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.3',
    cardType: CardType.STARTER,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.SPECIES_DISCOVERY, alienSpeciesIndex: 1 },
      { action: Action.TECH, publicityCost: 6, progress: 0 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.CARD, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.4',
    cardType: CardType.STARTER,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.SPECIES_DISCOVERY, alienSpeciesIndex: 2 },
      { action: Action.PROBE, movementPoints: 3, planets: [Planet.JUPITER, Planet.MARS, Planet.SATURN, Planet.VENUS], probeActions: [ProbeAction.ORBITER, ProbeAction.LANDER] },
      { action: Action.TECH, publicityCost: 0, progress: 1 },
    ]
  },
  // --- advances cards ---
  {
    id: 'S.5',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.ANALYZE, victoryPoints: 3 },
      { action: Action.TECH, publicityCost: 6, progress: 1 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.6',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.TECH, publicityCost: 6, progress: 1 },
      { action: Action.LAUNCH, publicity: 1, progress: 1 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.7',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.TECH, publicityCost: 6, progress: 1 },
      { action: Action.PROBE, movementPoints: 4, planets: [Planet.NEPTUNE, Planet.SATURN, Planet.MERCURY, Planet.VENUS], probeActions: [ProbeAction.LANDER, ProbeAction.ORBITER] },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.8',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.ANALYZE, victoryPoints: 3 },
      { action: Action.PROBE, movementPoints: 4, planets: [Planet.URANUS, Planet.JUPITER, Planet.MERCURY, Planet.VENUS], probeActions: [ProbeAction.LANDER, ProbeAction.ORBITER] },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.9',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.ANALYZE, victoryPoints: 3 },
      { action: Action.LAUNCH, publicity: 1, progress: 1 },
      { action: Action.PROBE, movementPoints: 4, planets: [Planet.NEPTUNE, Planet.URANUS, Planet.MERCURY, Planet.VENUS], probeActions: [ProbeAction.ORBITER, ProbeAction.LANDER] },
    ]
  },
  {
    id: 'S.10',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.ANALYZE, victoryPoints: 3 },
      { action: Action.LAUNCH, publicity: 1, progress: 1 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.11',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.TECH, publicityCost: 6, progress: 1 },
      { action: Action.ANALYZE, victoryPoints: 3 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.12',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.TECH, publicityCost: 6, progress: 1 },
      { action: Action.LAUNCH, publicity: 1, progress: 1 },
      { action: Action.PROBE, movementPoints: 4, planets: [Planet.MERCURY, Planet.SATURN, Planet.JUPITER, Planet.VENUS], probeActions: [ProbeAction.LANDER, ProbeAction.ORBITER] },
    ]
  },
  {
    id: 'S.13',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.PROBE, movementPoints: 4, planets: [Planet.NEPTUNE, Planet.URANUS, Planet.MARS, Planet.VENUS], probeActions: [ProbeAction.LANDER, ProbeAction.ORBITER] },
      { action: Action.ANALYZE, victoryPoints: 3 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.14',
    cardType: CardType.ADVANCED,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.LAUNCH, publicity: 1, progress: 1 },
      { action: Action.TECH, publicityCost: 6, progress: 1 },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.EARTH, ScanSector.CARD] },
    ]
  },
  // --- alien cards ---
  {
    id: 'S.15',
    cardType: CardType.ALIEN,
    alienSpecies: AlienSpecies.MASCAMITES,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.LAUNCH, publicity: 1, progress: 0 },
      { action: Action.SPECIES_SPECIAL_ACTION }
    ]
  },
  {
    id: 'S.16',
    cardType: CardType.ALIEN,
    alienSpecies: AlienSpecies.ANOMALIES,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.SPECIES_SPECIAL_ACTION },
      { action: Action.TECH, publicityCost: 0, progress: 1 },
    ]
  },
  {
    id: 'S.17',
    cardType: CardType.ALIEN,
    alienSpecies: AlienSpecies.OUMUAMUA,
    decisionDirection: DecisionDirection.LEFT,
    actions: [
      { action: Action.PROBE, movementPoints: 4, planets: [Planet.OUMUAMUA], probeActions: [ProbeAction.LANDER, ProbeAction.ORBITER] },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.CARD, ScanSector.OUMUAMUA] },
    ]
  },
  {
    id: 'S.18',
    cardType: CardType.ALIEN,
    alienSpecies: AlienSpecies.CENTAURIANS,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.SPECIES_SPECIAL_ACTION },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.CARD, ScanSector.CARD] },
    ]
  },
  {
    id: 'S.19',
    cardType: CardType.ALIEN,
    alienSpecies: AlienSpecies.EXERTIANS,
    decisionDirection: DecisionDirection.RIGHT,
    actions: [
      { action: Action.SPECIES_SPECIAL_ACTION },
      { action: Action.TELESCOPE, scanSector: [ScanSector.EARTH, ScanSector.CARD, ScanSector.CARD] },
    ]
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns Cards
   */
  getAll(cardType: CardType) : Card[] {
    return cards.filter(card => card.cardType === cardType)
  }

}
