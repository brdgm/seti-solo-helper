<template>
  <h1>{{t('gameEnd.title')}}</h1>

  <FinalScoring/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import DebugInfo from '@/components/round/DebugInfo.vue'
import FinalScoring from '@/components/scoring/FinalScoring.vue'

export default defineComponent({
  name: 'GameEnd',
  components: {
    FooterButtons,
    DebugInfo,
    FinalScoring
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    return { t, router, state, round, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    }
  }
})
</script>
