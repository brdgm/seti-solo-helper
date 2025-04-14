<template>
  <h1>{{t('gameEnd.title')}}</h1>

  <div class="instructions">
    <ol class="mt-4">
      <template v-if="hasObjectives">
        <li v-html="t('gameEnd.objectives.title')"></li>
        <ul>
          <li>
            <span v-html="t('gameEnd.objectives.enterNumberUncompleted')"></span>
            <ScoringTextInput v-model="uncompletedObjectives" class="ms-1"/></li>
          <template v-if="uncompletedObjectives != undefined">
            <li v-if="botObjectivesLastRoundVP > 0" v-html="t('gameEnd.objectives.botGainVP', {count:botObjectivesLastRoundVP})"></li>
          </template>
        </ul>
      </template>
      <li v-html="t('gameEnd.finalScoreBot', {count:navigationState.botResources.vp + botObjectivesLastRoundVP})"></li>
      <li v-html="t('gameEnd.finalScoring.title')"></li>
      <ul>
        <li v-html="t('gameEnd.finalScoring.scoringCards')"></li>
        <li v-html="t('gameEnd.finalScoring.goldScoringTiles')"></li>
        <li v-html="t('gameEnd.finalScoring.alienSpecies')"></li>
      </ul>
    </ol>
  </div>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import ScoringTextInput from '@brdgm/brdgm-commons/src/components/form/ScoringTextInput.vue'

export default defineComponent({
  name: 'GameEnd',
  components: {
    FooterButtons,
    DebugInfo,
    ScoringTextInput
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
    const uncompletedObjectives = ref(undefined as number|undefined)

    return { t, router, state, navigationState, round, routeCalculator, completedObjectives, uncompletedObjectives }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    hasObjectives() : boolean {
      return this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    },
    botObjectivesLastRoundVP() : number {
      return (this.uncompletedObjectives ?? 0) * 5
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
</style>
