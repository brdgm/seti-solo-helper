import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { State } from '@/store/state'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import AlienSpecies from '@/services/enum/AlienSpecies'
import mockBotPersistence from '../helper/mockBotPersistence'

describe('util/NavigationState', () => {
  it('getCardDeck', () => {
    expect(navigationState('RoundTurnPlayer',{round:'1',turn:'1',turnOrderIndex:'0'}, getState()).cardDeck?.toPersistence())
        .to.eql(mockCardDeck({pile:['S.3','S.4'], discard:[]}).toPersistence(), 'round1-turn1-player')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'1',turnOrderIndex:'1'}, getState()).cardDeck?.toPersistence())
        .to.eql(mockCardDeck({pile:['S.4'], discard:['S.3']}).toPersistence(), 'round1-turn1-bot1')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'2',turnOrderIndex:'1'}, getState()).cardDeck?.toPersistence())
        .to.eql(mockCardDeck({pile:[], discard:['S.4','S.3']}).toPersistence(), 'round1-turn2-bot1')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'3',turnOrderIndex:'1'}, getState()).botPass).to.be.true
  })

  it('speciesDiscovery', () => {
    const state = getState()
    expect(navigationState('RoundTurnBot',{round:'1',turn:'1'}, state).currentCard?.id).to.eq('S.3')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'2'}, state).currentCard?.id).to.eq('S.4')
    state.alienDiscovery.species = [AlienSpecies.MASCAMITES, AlienSpecies.CENTAURIANS]
    expect(navigationState('RoundTurnBot',{round:'1',turn:'1'}, state).currentCard?.id).to.eq('S.15')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'2'}, state).currentCard?.id).to.eq('S.18')
  })
})

function getState() : State {
  return mockState({rounds:[
    mockRound({round:1, startPlayer: Player.PLAYER, turns:[
      mockTurn({round:1,turn:1,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:['S.3','S.4']})})}),
      mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:['S.4'], discard:['S.3']})})}),
      mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:['S.4'], discard:['S.3']})})}),
      mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[], discard:['S.4','S.3']})})}),
      mockTurn({round:1,turn:3,player:Player.BOT,pass:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[], discard:['S.4','S.3']})})})
    ], initialBotPersistence: mockBotPersistence({
      cardDeck: mockCardDeck({pile:['S.3','S.4']})
    })})
  ]
  })  
}

function navigationState(routeName:string, params:RouteParams, state:State) : NavigationState {
  return new NavigationState(mockRouteLocation({name:routeName, params}), state)
}
