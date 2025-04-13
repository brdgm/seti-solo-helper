import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { CardDeckPersistence, State } from '@/store/state'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import AlienSpecies from '@/services/enum/AlienSpecies'

describe('util/NavigationState', () => {
  it('getCardDeck', () => {
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'1'}, state()).cardDeck?.toPersistence())
        .to.eql(cardDeck(['S.4'], ['S.3']), 'round1-turn1-bot1')
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'2'}, state()).cardDeck?.toPersistence())
        .to.eql(cardDeck([], ['S.4','S.3']), 'round1-turn2-bot1')
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'3'}, state()).botPass).to.be.true
  })

  it('speciesDiscovery', () => {
    const theState = state()
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'1'}, theState).currentCard?.id).to.eq('S.3')
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'2'}, theState).currentCard?.id).to.eq('S.4')
    theState.alienDiscovery.species = [AlienSpecies.MASCAMITES, AlienSpecies.CENTAURIANS]
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'1'}, theState).currentCard?.id).to.eq('S.15')
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'2'}, theState).currentCard?.id).to.eq('S.18')
  })
})

function state() : State {
  return mockState({rounds:[
    mockRound({round:1, startPlayer: Player.PLAYER, turns:[
      mockTurn({round:1,turn:1,player:Player.PLAYER}),
      mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:{cardDeck:cardDeck(['S.4'], ['S.3'])}}),
      mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true}),
      mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:{cardDeck:cardDeck([], ['S.4','S.3'])}}),
      mockTurn({round:1,turn:3,player:Player.BOT,botPersistence:{cardDeck:cardDeck([], ['S.4','S.3'])},pass:true})
    ], initialBotPersistence: {
      cardDeck: cardDeck(['S.3','S.4'], [])
    }})
  ]
  })  
}

function cardDeck(pile: string[], discard: string[]) : CardDeckPersistence {
  return mockCardDeck({pile, discard}).toPersistence()
}

function navigationState(params:RouteParams, state:State) : NavigationState {
  return new NavigationState(mockRouteLocation({params}), state)
}
