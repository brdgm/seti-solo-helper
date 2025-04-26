<template>
  <SideBar :navigationState="navigationState"/>
  <ObjectivesTopBar :navigationState="navigationState"/>
  <h1>{{t('roundEnd.title')}}</h1>

  <div class="instructions">
    <ul class="mt-4">
      <li v-html="t('roundEnd.gainIncome')"></li>
      <template v-if="hasObjectives">
        <li v-html="t('roundEnd.objectives.title', {count:expectedCompletedObjectives}, expectedCompletedObjectives)"></li>
        <ul>
          <li v-html="t('roundEnd.objectives.numberCompleted', {count:completedObjectives}, completedObjectives)"></li>
          <li v-if="discardObjectives > 0" v-html="t('roundEnd.objectives.discardObjectives', {count:discardObjectives}, discardObjectives)"></li>
          <li v-if="botObjectivesProgress > 0" v-html="t('roundEnd.objectives.botObjectiveProgress', {count:botObjectivesProgress})"></li>
        </ul>
      </template>
    </ul>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { BotPersistence, useStateStore } from '@/store/state'
import SideBar from '@/components/round/SideBar.vue'
import Player from '@/services/enum/Player'
import getPreviousTurns from '@/util/getPreviousTurns'
import { MAX_TURN } from '@/util/getTurnOrder'
import CardDeck from '@/services/CardDeck'
import DebugInfo from '@/components/round/DebugInfo.vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ObjectiveStack from '@/services/ObjectiveStack'
import ObjectivesTopBar from '@/components/round/ObjectivesTopBar.vue'

export default defineComponent({
  name: 'RoundEnd',
  components: {
    FooterButtons,
    SideBar,
    ObjectivesTopBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    const previousTurns = getPreviousTurns({state, round, turn:MAX_TURN, player:Player.BOT})
    const lastTurnBotPersistence = previousTurns[previousTurns.length-1]?.botPersistence
    const objectiveStack = lastTurnBotPersistence?.objectiveStack ? ObjectiveStack.fromPersistence(lastTurnBotPersistence.objectiveStack) : ObjectiveStack.new(state.setup.difficultyLevel)

    // check objective completion / bot progress
    const hasObjectives = state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    const expectedCompletedObjectives = hasObjectives ? round : 0
    const completedObjectives = objectiveStack.complete.length
    const discardObjectives = Math.min(expectedCompletedObjectives, completedObjectives)
    const botObjectivesProgress = (expectedCompletedObjectives - discardObjectives) * 3

    return { t, router, state, navigationState, round, routeCalculator, lastTurnBotPersistence, objectiveStack,
      hasObjectives, expectedCompletedObjectives, completedObjectives, discardObjectives, botObjectivesProgress }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      // prepare next round with new player order
      const startPlayer = this.navigationState.startPlayer == Player.PLAYER ? Player.BOT : Player.PLAYER
      const nextRound = this.round + 1
      if (!this.lastTurnBotPersistence) {
        return
      }
      const cardDeck = CardDeck.fromPersistence(this.lastTurnBotPersistence.cardDeck)
      cardDeck.prepareForNextRound()
      const previousTurnResources = this.navigationState.botResources
      const gainResources = this.navigationState.botGainResources
      gainResources.gainProgressSingleStep.value = this.botObjectivesProgress
      const drawAdvancedCards = gainResources.getDrawAdvancedCardCount(previousTurnResources)
      cardDeck.addAdvancedCards(drawAdvancedCards)

      this.objectiveStack.checkCompletedObjectives()
      this.objectiveStack.discardCompletedObjectives(this.discardObjectives)

      const initialBotPersistence : BotPersistence = {
        cardDeck: cardDeck.toPersistence(),
        objectiveStack: this.objectiveStack.toPersistence(),
        milestoneTracker: this.navigationState.milestoneTracker.toPersistence(),
        resources: gainResources.merge(previousTurnResources)
      }

      this.state.storeRound({
        round: nextRound,
        startPlayer,
        turns: [],
        initialBotPersistence
      })
      const routeCalculator = new RouteCalculator({round:this.round+1})
      this.router.push(routeCalculator.getFirstTurnRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  & > ul > li {
    margin-top: 0.5rem;
  }
}
input {
  width: 3rem;
}
.alert {
  margin-right: 150px;
  @media (max-width: 600px) {
    margin-right: 125px;
  }
}
</style>
