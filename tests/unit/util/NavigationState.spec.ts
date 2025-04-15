import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import mockBotPersistence from '../helper/mockBotPersistence'

const state = mockState({rounds:[
  mockRound({round:1, startPlayer: Player.PLAYER, turns:[
    mockTurn({round:1,turn:1,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:['S.3','S.4']})})}),
    mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:['S.4'], discard:['S.3']})})}),
    mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:['S.4'], discard:['S.3']})})}),
    mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[], discard:['S.4','S.3']})})}),
    mockTurn({round:1,turn:3,player:Player.BOT,pass:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[], discard:['S.4','S.3']})})})
  ], initialBotPersistence: mockBotPersistence({
    cardDeck: mockCardDeck({pile:['S.3','S.4']})
  })})
]})

describe('util/NavigationState', () => {
  it('getCardDeck', () => {
    expect(navigationState('RoundTurnPlayer',{round:'1',turn:'1',turnOrderIndex:'0'}).cardDeck?.toPersistence())
        .to.eql(mockCardDeck({pile:['S.3','S.4'], discard:[]}).toPersistence(), 'round1-turn1-player')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'1',turnOrderIndex:'1'}).cardDeck?.toPersistence())
        .to.eql(mockCardDeck({pile:['S.4'], discard:['S.3']}).toPersistence(), 'round1-turn1-bot1')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'2',turnOrderIndex:'1'}).cardDeck?.toPersistence())
        .to.eql(mockCardDeck({pile:[], discard:['S.4','S.3']}).toPersistence(), 'round1-turn2-bot1')
    expect(navigationState('RoundTurnBot',{round:'1',turn:'3',turnOrderIndex:'1'}).botPass).to.be.true
  })
})

function navigationState(routeName:string, params:RouteParams) : NavigationState {
  return new NavigationState(mockRouteLocation({name:routeName, params}), state)
}
