import Card, { CardAction } from './Card'
import Action from './enum/Action'
import { BotResources, State } from '@/store/state'
import Cards from './Cards'
import CardDeck from './CardDeck'

/**
 * Determine possible actions for bot's current card
 */
export default class BotActions {

  private readonly cardDeck : CardDeck
  private readonly botResources : BotResources
  private readonly botPass : boolean
  private readonly state : State

  constructor(cardDeck : CardDeck, botResources: BotResources, botPass: boolean|undefined, state : State) {
    this.cardDeck = cardDeck
    this.botResources = botResources
    this.botPass = botPass ?? false
    this.state = state
  }

  public get currentCard() : Card|undefined {
    let currentCard = this.cardDeck.currentCard
    if (currentCard) {
      const speciesDiscoveryAction = currentCard.actions.find(item => item.action == Action.SPECIES_DISCOVERY)
      if (speciesDiscoveryAction) {
        // replace card with alien species card is species is discovered
        const alienSpecies = this.state.alienDiscovery.species[speciesDiscoveryAction.alienSpeciesIndex-1]
        if (alienSpecies) {
          currentCard = Cards.getAlienSpeciesCard(alienSpecies)
        }
      }
    }
    return currentCard
  }

  public get actions() : CardAction[] {
    if (this.botPass) {
      return []
    }
    return (this.currentCard?.actions ?? []).filter(item => this.isActionPossible(item))
  }

  private isActionPossible(action : CardAction) : boolean {
    switch (action.action) {
      case Action.TECH:
        return this.botResources.publicity >= action.publicityCost        
      case Action.LAUNCH:
        return this.botResources.probeCount == 0
      case Action.PROBE:
        return this.botResources.probeCount > 0
      case Action.ANALYZE:
        return this.botResources.data >= 6
      default:
        return true
    }
  }

}
