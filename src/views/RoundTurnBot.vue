<template>
  <SideBar :navigationState="navigationState"/>
  <h1>Turn Bot</h1>

  <template v-if="navigationState.botPass">
    <p class="mt-4">Bot passes...</p>
  </template>
  <template v-else>
    <p class="mt-4">...</p>
  </template>

  <button class="btn btn-primary btn-lg mt-4" @click="next">
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
import { useStateStore } from '@/store/state'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import { Tooltip } from 'bootstrap'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, action, player } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, action, player})

    return { t, router, navigationState, state, routeCalculator, round, turn }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      const cardDeck = this.navigationState.cardDeck
      if (!cardDeck) {
        return
      }
      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        player:this.navigationState.player,
        botPersistence: {
          cardDeck: cardDeck.toPersistence()
        },
        pass: this.navigationState.botPass ? true : undefined
      })
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    },
    notPossible() : void {
      this.router.push(this.routeCalculator.getNextActionRouteTo(this.state))
    }
  },
  mounted() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
  }
})
</script>
