import RouteCalculator from '@/services/RouteCalculator'
import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'
import Player from '@/services/enum/Player'
import mockTurn from '../helper/mockTurn'

describe('services/RouteCalculator', () => {
  it('getNextRouteTo-round1-turn1-player', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:0, player:Player.PLAYER})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/1/bot')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('')
  })

  it('getNextRouteTo-round2-turn1-bot', () => {
    const routeCalculator = new RouteCalculator({round:2, turn:1, turnOrderIndex:0, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:2, startPlayer:Player.BOT})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/2/turn/1/1/player')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/end')
  })

  it('getNextRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/player')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player')
  })

  it('getNextActionRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getNextActionRouteTo(state)).to.eq('/round/1/turn/1/1/bot/action/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player')
  })

  it('getNextActionRouteTo-round1-turn1-bot1-action1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, action:1, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getNextActionRouteTo(state)).to.eq('/round/1/turn/1/1/bot/action/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot')
  })

  it('getNextActionRouteTo-round1-turn1-bot1-action2', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, action:2, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getNextActionRouteTo(state)).to.eq('/round/1/turn/1/1/bot/action/3')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/action/1')
  })

  it('getNextRouteTo_round1-turn1-bot1-playerpassed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER, turns:[
        mockTurn({round:1, turn:1, player:Player.PLAYER, pass:true})
      ]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/bot')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, player:Player.BOT})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER, turns:[
        mockTurn({round:1, turn:1, player:Player.PLAYER, pass:true}),
        mockTurn({round:1, turn:1, player:Player.BOT, pass:true})]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player')
  })

  it('getFirstTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('/round/1/turn/1/0/player')
  })

  it('getFirstTurnRouteTo_noRounds', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('')
  })

  it('getLastTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER, turns:[
        mockTurn({round:1, turn:1, player:Player.PLAYER, pass:true}),
        mockTurn({round:1, turn:1, player:Player.BOT, pass:true})]})
  ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('/round/1/turn/1/1/bot')
  })

  it('getLastTurnRouteTo-empty', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({rounds:[
      mockRound({round:1, startPlayer:Player.PLAYER})
    ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('')
  })
})
