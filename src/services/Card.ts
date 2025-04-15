import Action from './enum/Action'
import AlienSpecies from './enum/AlienSpecies'
import CardType from './enum/CardType'
import DecisionDirection from './enum/DecisionDirection'
import Planet from './enum/Planet'
import ProbeAction from './enum/ProbeAction'
import ScanSector from './enum/ScanSector'

export default interface Card {
  id: string
  cardType: CardType
  alienSpecies?: AlienSpecies
  decisionDirection: DecisionDirection
  actions: CardAction[]
}

export type CardAction =
  CardActionTech |
  CardActionLaunch |
  CardActionProbe |
  CardActionTelescope |
  CardActionAnalyze |
  CardActionSpeciesDiscovery |
  CardActionSpeciesSpecialAction |
  CardActionPassAction

export type CardActionTech = {
  action: Action.TECH
  publicityCost: number
  progress: number
}

export type CardActionLaunch = {
  action: Action.LAUNCH
  publicity: number
  progress: number
}

export type CardActionProbe = {
  action: Action.PROBE
  movementPoints: number
  planets: Planet[]
  probeActions: ProbeAction[]
}

export type CardActionTelescope = {
  action: Action.TELESCOPE
  scanSector: ScanSector[]
}

export type CardActionAnalyze = {
  action: Action.ANALYZE
  victoryPoints: number
}

export type CardActionSpeciesDiscovery = {
  action: Action.SPECIES_DISCOVERY
  alienSpeciesIndex: number
}

export type CardActionSpeciesSpecialAction = {
  action: Action.SPECIES_SPECIAL_ACTION
}

export type CardActionPassAction = {
  action: Action.PASS
}
