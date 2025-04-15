import getTurnOrder from '@/util/getTurnOrder'
import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import Player from '@/services/enum/Player'
import mockTurn from '../helper/mockTurn'

describe('util/getTurnOrder', () => {
  it('round1-turn2', () => {
    const state = mockState({rounds: [
      mockRound({round:1, startPlayer: Player.PLAYER})
    ]})
    expect(getTurnOrder(state, 1, 2)).to.eql([
      {round:1, turn:1, turnOrderIndex: 0, player:Player.PLAYER},
      {round:1, turn:1, turnOrderIndex: 1, player:Player.BOT},
      {round:1, turn:2, turnOrderIndex: 0, player:Player.PLAYER},
      {round:1, turn:2, turnOrderIndex: 1, player:Player.BOT},
      {round:1, turn:3, turnOrderIndex: 0, player:Player.PLAYER},
      {round:1, turn:3, turnOrderIndex: 1, player:Player.BOT},
    ])
  })

  it('round1-turn2-passed', () => {
    const state = mockState({rounds:[
      mockRound({round:1, startPlayer: Player.PLAYER, turns:[
        mockTurn({round:1,turn:1,player:Player.PLAYER}),
        mockTurn({round:1,turn:1,player:Player.BOT,pass:true}),
        mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true}),
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2)).to.eql([
      {round:1, turn:1, turnOrderIndex:0, player:Player.PLAYER},
      {round:1, turn:1, turnOrderIndex:1, player:Player.BOT},
      {round:1, turn:2, turnOrderIndex:0, player:Player.PLAYER},
    ])
  })
})
