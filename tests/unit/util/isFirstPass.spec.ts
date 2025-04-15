import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import Player from '@/services/enum/Player'
import mockTurn from '../helper/mockTurn'
import mockBotPersistence from '../helper/mockBotPersistence'
import isFirstPass from '@/util/isFirstPass'

const state = mockState({rounds:[
  mockRound({round:1, startPlayer: Player.PLAYER, turns:[
    mockTurn({round:1,turn:1,player:Player.PLAYER}),
    mockTurn({round:1,turn:1,player:Player.BOT}),
    mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true}),
    mockTurn({round:1,turn:2,player:Player.BOT}),
    mockTurn({round:1,turn:3,player:Player.BOT,pass:true})
  ], initialBotPersistence: mockBotPersistence()})
]})

describe('util/isFirstPass', () => {
  it('isFirstPass', () => {
    expect(isFirstPass(state, 1, 2, 0)).to.true
    expect(isFirstPass(state, 1, 2, 1)).to.false
  })
})
