import { BotPersistence, BotResources, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import Cards from '@/services/Cards'
import getInitialBotResources from './getInitialBotResources'
import BotGainResources from '@/services/BotGainResources'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly action : number
  readonly player : Player
  readonly startPlayer : Player
  readonly cardDeck : CardDeck
  readonly botResources : BotResources
  readonly botGainResources : BotGainResources
  readonly botPass?: boolean
  private readonly state

  constructor(route: RouteLocation, state: State) {    
    this.state = state
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.action = getIntRouteParam(route, 'action')
    this.player = (route.name == 'RoundTurnPlayer') ? Player.PLAYER : Player.BOT

    const roundData = state.rounds.find(item => item.round === this.round)
    this.startPlayer = roundData?.startPlayer ?? Player.PLAYER

    const botPersistence = getBotPersistence(state, this.round, this.turn, this.turnOrderIndex)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
    this.botResources = botPersistence.resources
    this.botGainResources = new BotGainResources()

    if (this.player == Player.BOT) {
      if (this.cardDeck.pileEmpty) {
        this.botPass = true
      }
      else {
        this.cardDeck.draw()
      }
    }
  }

  public get currentCard() : Card|undefined {
    let currentCard = this.cardDeck?.currentCard
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

}

function getBotPersistence(state:State, round:number, turn:number, turnOrderIndex:number) : BotPersistence {
  const roundData = state.rounds.find(item => item.round==round)

  // get from previous turn
  const lastTurn = roundData?.turns.toSorted((item1,item2) => item1.turn==item2.turn ? item1.turnOrderIndex - item2.turnOrderIndex : item1.turn - item2.turn)
      .findLast(item => item.turn < turn || (item.turn == turn && item.turnOrderIndex < turnOrderIndex))
  if (lastTurn) {
    return lastTurn.botPersistence
  }

  // get initial card deck prepared for this round
  const initialBotPersistence = roundData?.initialBotPersistence
  if (initialBotPersistence) {
    return initialBotPersistence
  }
  
  // last resort: create new (should never happen)
  return {
    cardDeck: CardDeck.new(round).toPersistence(),
    resources: getInitialBotResources(roundData?.startPlayer ?? Player.PLAYER),
  }
}
