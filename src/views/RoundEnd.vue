<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundEnd.title')}}</h1>

  <div class="instructions">
    <ol class="mt-4">
      <li v-html="t('roundEnd.gainIncome')"></li>
      <template v-if="hasObjectives">
        <li v-html="t('roundEnd.objectives.title', {count:expectedCompletedObjectives})"></li>
        <ul>
          <li>
            <span v-html="t('roundEnd.objectives.enterNumberCompleted')"></span>
            <NumberInput v-model="completedObjectives" class="ms-1"/></li>
          <template v-if="completedObjectives != undefined">
            <li v-if="discardObjectives > 0" v-html="t('roundEnd.objectives.discardObjectives', {count:discardObjectives})"></li>
            <li v-if="botObjectivesProgress > 0" v-html="t('roundEnd.objectives.botObjectiveProgress', {count:botObjectivesProgress})"></li>
          </template>
        </ul>
      </template>
    </ol>
  </div>

  <div v-if="hasObjectives && completedObjectives == undefined" class="alert alert-warning" v-html="t('roundEnd.objectives.objectivesWarning')"></div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="!hasObjectives || completedObjectives != undefined">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'RoundEnd',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    const completedObjectives = ref(undefined as number|undefined)

    return { t, router, state, navigationState, round, routeCalculator, completedObjectives }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    hasObjectives() : boolean {
      return this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    },
    expectedCompletedObjectives() : number {
      return this.round
    },
    discardObjectives() : number {
      if (this.completedObjectives) {
        return Math.min(this.expectedCompletedObjectives, this.completedObjectives)
      }
      return 0
    },
    botObjectivesProgress() : number {
      if (!this.hasObjectives) {
        return 0
      }
      return (this.expectedCompletedObjectives - this.discardObjectives) * 3
    }
  },
  methods: {
    next() : void {
      // prepare next round with new player order
      const startPlayer = this.navigationState.startPlayer == Player.PLAYER ? Player.BOT : Player.PLAYER
      const nextRound = this.round + 1
      const previousTurns = getPreviousTurns({state:this.state, round:this.round,turn:MAX_TURN,player:Player.BOT})
      const lastTurn = previousTurns[previousTurns.length-1]
      if (!lastTurn?.botPersistence) {
        return
      }
      const cardDeck = CardDeck.fromPersistence(lastTurn.botPersistence.cardDeck)
      cardDeck.prepareForNextRound()
      const previousTurnResources = this.navigationState.botResources
      const gainResources = this.navigationState.botGainResources
      gainResources.gainProgressSingleStep.value = this.botObjectivesProgress
      const drawAdvancedCards = gainResources.getDrawAdvancedCardCount(previousTurnResources)
      cardDeck.addAdvancedCards(drawAdvancedCards)
      const initialBotPersistence : BotPersistence = {
        cardDeck: cardDeck.toPersistence(),
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
  ol > li {
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
