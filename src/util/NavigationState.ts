import { BotPersistence, BotResources, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import getInitialBotResources from './getInitialBotResources'
import BotActions from '@/services/BotActions'
import { MAX_TURN } from './getTurnOrder'
import ObjectiveStack from '@/services/ObjectiveStack'
import MilestoneTracker from '@/services/MilestoneTracker'
import BotActionResources from '@/services/BotActionResources'
import getFirstRound from './getFirstRound'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly action : number
  readonly player : Player
  readonly startPlayer : Player
  readonly cardDeck : CardDeck
  readonly objectiveStack : ObjectiveStack
  readonly milestoneTracker : MilestoneTracker
  readonly botResources : BotResources
  readonly botActionResources : BotActionResources
  readonly botPass?: boolean
  readonly botActions : BotActions

  constructor(route: RouteLocation, state: State) {    
    this.round = getRound(route, state)
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.action = getIntRouteParam(route, 'action')
    this.player = (route.name == 'RoundTurnBot' || route.name == 'RoundTurnBotAction') ? Player.BOT : Player.PLAYER

    const roundData = state.rounds.find(item => item.round === this.round)
    this.startPlayer = roundData?.startPlayer ?? Player.PLAYER

    const lookupTurn = isRoundEndRoute(route) ? MAX_TURN : this.turn
    const botPersistence = getBotPersistence(state, this.round, lookupTurn, this.turnOrderIndex)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
    this.objectiveStack = botPersistence.objectiveStack ? ObjectiveStack.fromPersistence(botPersistence.objectiveStack) : ObjectiveStack.new(state.setup.difficultyLevel)
    this.milestoneTracker = botPersistence.milestoneTracker ? MilestoneTracker.fromPersistence(botPersistence.milestoneTracker) : MilestoneTracker.new()
    this.botResources = botPersistence.resources
    this.botActionResources = new BotActionResources()

    if (this.player == Player.BOT) {
      if (this.cardDeck.pileEmpty) {
        this.botPass = true
      }
      else {
        this.cardDeck.draw()
      }
    }

    this.botActions = new BotActions(this.cardDeck, this.milestoneTracker, this.botResources, this.botPass, state)
  }

}

function getRound(route: RouteLocation, state: State) : number {
  const round = getIntRouteParam(route, 'round')
  if (round > 0) {
    return round
  }
  else {
    return getFirstRound(state.setup.expansions ?? [])
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
    cardDeck: CardDeck.new(state.setup.difficultyLevel, state.setup.expansions ?? []).toPersistence(),
    objectiveStack: ObjectiveStack.new(state.setup.difficultyLevel).toPersistence(),
    milestoneTracker: MilestoneTracker.new().toPersistence(),
    resources: getInitialBotResources(roundData?.startPlayer ?? Player.PLAYER, state.setup.difficultyLevel),
  }
}

function isRoundEndRoute(route:RouteLocation) : boolean {
  return route.name == 'RoundEnd' || route.name == 'GameEnd'
}
