<template>
  <SideBar :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
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
        <template v-if="uncompletedLongTermTasks > 0">
          <li v-html="t('roundEnd.longTermObjectives', {count:uncompletedLongTermTasks}, uncompletedLongTermTasks)"></li>
          <ul>
            <li v-html="t('roundEnd.objectives.botObjectiveProgress', {count:uncompletedLongTermTasks})"></li>
          </ul>
        </template>
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
import DebugInfo from '@/components/round/DebugInfo.vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ObjectivesTopBar from '@/components/round/ObjectivesTopBar.vue'
import BotGameBoardResources from '@/services/BotGameBoardResources'
import ObjectiveLevel from '@/services/enum/ObjectiveLevel'

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
    const { round, objectiveStack, cardDeck } = navigationState

    const routeCalculator = new RouteCalculator({round}, state.setup.expansions ?? [])

    // check objective completion / bot progress
    const hasObjectives = state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    const expectedCompletedObjectives = hasObjectives ? round : 0
    const completedObjectives = objectiveStack.complete.length
    const discardObjectives = Math.min(expectedCompletedObjectives, completedObjectives)
    const botObjectivesProgress = (expectedCompletedObjectives - discardObjectives) * 3

    // long-term objectives
    let uncompletedLongTermTasks = 0
    for (let objectiveIndex=0; objectiveIndex<objectiveStack.current.length; objectiveIndex++) {
      const objective = objectiveStack.current[objectiveIndex]
      if (objective.level == ObjectiveLevel.LONG_TERM) {
        const uncompletedTasks = objectiveStack.currentItemCheck[objectiveIndex].filter(check => !check).length
        uncompletedLongTermTasks += uncompletedTasks
      }
    }

    const botGameBoardResources = { progressSingleStep: botObjectivesProgress + uncompletedLongTermTasks } as BotGameBoardResources

    return { t, router, state, navigationState, round, routeCalculator, cardDeck, objectiveStack,
      hasObjectives, expectedCompletedObjectives, completedObjectives, discardObjectives, uncompletedLongTermTasks,
      botObjectivesProgress, botGameBoardResources }
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
      this.cardDeck.prepareForNextRound()
      const previousTurnResources = this.navigationState.botResources
      const botActionResources = this.navigationState.botActionResources
      botActionResources.drawAdvancedCards(previousTurnResources, this.botGameBoardResources, this.cardDeck)

      this.objectiveStack.checkCompletedObjectives()
      this.objectiveStack.discardCompletedObjectives(this.discardObjectives)

      const initialBotPersistence : BotPersistence = {
        cardDeck: this.cardDeck.toPersistence(),
        objectiveStack: this.objectiveStack.toPersistence(),
        milestoneTracker: this.navigationState.milestoneTracker.toPersistence(),
        resources: botActionResources.merge(previousTurnResources, this.botGameBoardResources)
      }

      this.state.storeRound({
        round: nextRound,
        startPlayer,
        turns: [],
        initialBotPersistence
      })
      const routeCalculator = new RouteCalculator({round:this.round+1}, this.state.setup.expansions ?? [])
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
