import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck, { MockCardDeckParams } from '../helper/mockCardDeck'
import { State } from '@/store/state'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import AlienSpecies from '@/services/enum/AlienSpecies'
import mockBotPersistence from '../helper/mockBotPersistence'
import BotActions from '@/services/BotActions'
import Action from '@/services/enum/Action'
import MilestoneTracker from '@/services/MilestoneTracker'
import mockMilestoneTracker from '../helper/mockMilestoneTracker'
import MilestoneType from '@/services/enum/MilestoneType'

describe('services/BotActions', () => {
  it('currentCard-speciesDiscovery-undiscovered', () => {
    const state = getState({cardDeck:{pile:['S.3','S.4']}})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).currentCard?.id).to.eq('S.3')
    expect(botActions('RoundTurnBot',{round:'1',turn:'2'}, state).currentCard?.id).to.eq('S.4')
  })

  it('currentCard-speciesDiscovery-discovered', () => {
    const state = getState({cardDeck:{pile:['S.3','S.4']}, alienSpecies:[AlienSpecies.MASCAMITES, AlienSpecies.CENTAURIANS]})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).currentCard?.id).to.eq('S.15')
    expect(botActions('RoundTurnBot',{round:'1',turn:'2'}, state).currentCard?.id).to.eq('S.18')
  })

  it('S1-actions-no-resources', () => {
    const state = getState({cardDeck:{pile:['S.1','S.2']}})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      // skip analyze - not enough data
      Action.LAUNCH
      // skip tech - not enough publicity
      // skip probe - no probes
    ])
  })

  it('S1-actions-probe', () => {
    const state = getState({cardDeck:{pile:['S.1','S.2']}, probeCount:1})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      // skip analyze - not enough data
      // skip launch - probe already in space
      // skip tech - not enough publicity
      Action.PROBE
    ])
  })

  it('S1-actions-data', () => {
    const state = getState({cardDeck:{pile:['S.1','S.2']}, data:7})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      Action.ANALYZE,
      Action.LAUNCH
      // skip tech - not enough publicity
      // skip probe - no probes
    ])
  })

  it('S1-actions-publicity', () => {
    const state = getState({cardDeck:{pile:['S.1','S.2']}, publicity:8})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      // skip analyze - not enough data
      Action.LAUNCH,
      Action.TECH
      // skip probe - no probes
    ])
  })

  it('S2-actions-no-resources', () => {
    const state = getState({cardDeck:{pile:['S.2','S.1']}})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      // skip analyze - not enough data
      // skip tech - not enough publicity
      Action.TELESCOPE
    ])
  })

  it('S3-species-action-centaurians-no-milestone', () => {
    const state = getState({cardDeck:{pile:['S.3','S.1']}, alienSpecies:[AlienSpecies.CENTAURIANS]})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      Action.SPECIES_SPECIAL_ACTION, Action.TELESCOPE
    ])
  })

  it('S3-species-action-centaurians-milestone', () => {
    const state = getState({cardDeck:{pile:['S.3','S.1']}, alienSpecies:[AlienSpecies.CENTAURIANS],
      milestoneTracker:mockMilestoneTracker({milestones:[{type:MilestoneType.CENTAURIANS, score:16}]})})
    expect(botActions('RoundTurnBot',{round:'1',turn:'1'}, state).actions.map(item => item.action)).to.eql([
      Action.TELESCOPE
    ])
  })
})

function getState(params: {cardDeck: MockCardDeckParams, publicity?: number, data?: number, probeCount?: number,
    alienSpecies?: (AlienSpecies|undefined)[], milestoneTracker?: MilestoneTracker}) : State {
  const { publicity, data, probeCount, alienSpecies, milestoneTracker } = params
  return mockState({alienSpecies, rounds:[
    mockRound({round:1, startPlayer: Player.PLAYER, turns:[
      mockTurn({round:1,turn:1,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck(params.cardDeck),publicity,data,probeCount,milestoneTracker})}),
      mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck(params.cardDeck, 1),publicity,data,probeCount,milestoneTracker})}),
      mockTurn({round:1,turn:2,player:Player.PLAYER,pass:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck(params.cardDeck,1),publicity,data,probeCount,milestoneTracker})}),
      mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck(params.cardDeck, 2),publicity,data,probeCount,milestoneTracker})}),
      mockTurn({round:1,turn:3,player:Player.BOT,pass:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck(params.cardDeck, 2),publicity,data,probeCount,milestoneTracker})})
    ], initialBotPersistence: mockBotPersistence({
      cardDeck: mockCardDeck(params.cardDeck), publicity, data, probeCount, milestoneTracker
    })})
  ]
  })  
}

function botActions(routeName:string, params:RouteParams, state:State) : BotActions {
  const navigationState = new NavigationState(mockRouteLocation({name:routeName, params}), state)
  return navigationState.botActions
}
