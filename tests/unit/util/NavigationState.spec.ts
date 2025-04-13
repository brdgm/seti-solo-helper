import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { CardDeckPersistence } from '@/store/state'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'

const state = mockState({rounds:[
    mockRound({round:1, startPlayer: Player.PLAYER, turns:[
      mockTurn({round:1,turn:1,player:Player.PLAYER}),
      mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:{cardDeck:cardDeck(['S.2'], ['S.1'])}}),
      mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true}),
      mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:{cardDeck:cardDeck([], ['S.2','S.1'])}}),
      mockTurn({round:1,turn:3,player:Player.BOT,botPersistence:{cardDeck:cardDeck([], ['S.2','S.1'])},pass:true})
    ], initialBotPersistence: {
      cardDeck: cardDeck(['S.1','S.2'], [])
    }})
  ]
})

describe('util/NavigationState', () => {
  it('getCardDeck', () => {
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'1'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(['S.2'], ['S.1']), 'round1-turn1-bot1')
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'2'}).cardDeck?.toPersistence())
        .to.eql(cardDeck([], ['S.2','S.1']), 'round1-turn2-bot1')
    expect(navigationState({name:'RoundTurnBot',round:'1',turn:'3'}).botPass).to.be.true
  })
})

function cardDeck(pile: string[], discard: string[]) : CardDeckPersistence {
  return mockCardDeck({pile, discard}).toPersistence()
}

function navigationState(params:RouteParams) : NavigationState {
  return new NavigationState(mockRouteLocation({params}), state)
}
