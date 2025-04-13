import { BotPersistence, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import Player from '@/services/enum/Player'
import getPreviousTurns from './getPreviousTurns'
import CardDeck from '@/services/CardDeck'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly action : number
  readonly player : Player
  readonly startPlayer : Player
  readonly botPersistence? : BotPersistence
  readonly cardDeck? : CardDeck
  readonly botPass?: boolean

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.action = getIntRouteParam(route, 'action')

    if (route.name == 'RoundTurnPlayer') {
      this.player = Player.PLAYER
    }
    else {
      this.player = Player.BOT
    }

    const roundData = state.rounds.find(item => item.round === this.round)
    this.startPlayer = roundData?.startPlayer ?? Player.PLAYER

    if (this.player == Player.BOT) {
      this.botPersistence = getBotPersistence(state, this.round, this.turn)
      this.cardDeck = CardDeck.fromPersistence(this.botPersistence.cardDeck)
      if (this.cardDeck.pileEmpty) {
        this.botPass = true
      }
      else {
        this.cardDeck.draw()
      }
    }
  }

}

function getBotPersistence(state:State, round:number, turn:number) : BotPersistence {
  // get card deck from previous turn
  const previousTurns = getPreviousTurns({state, round, turn, player: Player.BOT})
  for (let i=previousTurns.length-1; i>=0; i--) {
    const previousTurn = previousTurns[i]
    if (previousTurn.botPersistence) {
      return previousTurn.botPersistence
    }
  }
  // get initial card deck prepared for this round
  const initialBotPersistence = state.rounds.find(item => item.round == round)?.initialBotPersistence
  if (initialBotPersistence) {
    return initialBotPersistence
  }
  // last resort: create new card deck
  return { cardDeck: CardDeck.new(round).toPersistence() }
}
