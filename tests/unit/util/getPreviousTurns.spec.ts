import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'
import mockTurn from '../helper/mockTurn'
import getPreviousTurns from '@/util/getPreviousTurns'
import { MAX_TURN } from '@/util/getTurnOrder'
import Player from '@/services/enum/Player'

const state = mockState({rounds: [
  mockRound({round:1, startPlayer: Player.PLAYER, turns:[
    mockTurn({round:1,turn:1,player:Player.PLAYER}),
    mockTurn({round:1,turn:1,player:Player.BOT}),
    mockTurn({round:1,turn:2,player:Player.PLAYER}),
    mockTurn({round:1,turn:2,player:Player.BOT}),
    mockTurn({round:1,turn:3,player:Player.PLAYER}),
    mockTurn({round:1,turn:3,player:Player.BOT})
  ]})]
})

describe('util/getPreviousTurns', () => {
  it('round1-turn2-bot', () => {
    const turns = getPreviousTurns({state, round:1, turn:2, player:Player.BOT})
    expect(turns.length).to.eq(1)
    expect(turns[0].turn).to.eq(1)
    expect(turns[0].player).to.eq(Player.BOT)
  })

  it('round1-turn-all-bot', () => {
    const turns = getPreviousTurns({state, round:1, turn:MAX_TURN-1, player:Player.BOT})
    expect(turns.length).to.eq(3)
    expect(turns[0].turn).to.eq(1)
    expect(turns[0].player).to.eq(Player.BOT)
    expect(turns[1].turn).to.eq(2)
    expect(turns[1].player).to.eq(Player.BOT)
    expect(turns[2].turn).to.eq(3)
    expect(turns[2].player).to.eq(Player.BOT)
  })
})
