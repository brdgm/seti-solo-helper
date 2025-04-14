<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('player.bot')}}</h1>

  <template v-if="navigationState.botPass">
    <div class="passInfo">
      <AppIcon type="action" name="pass" class="icon"/>
      <p class="mt-4" v-html="t('roundTurnBot.pass')"></p>
    </div>
    <BotResources :botGainResources="navigationState.botGainResources"/>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()" data-testid="nextButton">
      {{t('action.next')}}
    </button>
  </template>
  <template v-else>
    <BotTurn v-if="navigationState.botActions.currentCard"
       :navigationState="navigationState"
       :botActions="navigationState.botActions"
       :currentCard="navigationState.botActions.currentCard"
       :key="JSON.stringify(state.alienDiscovery.species)"
       @executed="next" @notPossible="notPossible"/>
  </template>

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
import BotTurn from '@/components/round/BotTurn.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { CardAction } from '@/services/Card'
import TechType from '@/services/enum/TechType'
import BotResources from '@/components/round/BotResources.vue'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotTurn,
    AppIcon,
    BotResources
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
    next(action?: CardAction, techType?: TechType) : void {
      const cardDeck = this.navigationState.cardDeck
      const gainResources = this.navigationState.botGainResources
      if (action) {
        gainResources.applyAction(action, techType)
      }
      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        player:this.navigationState.player,
        botPersistence: {
          cardDeck: cardDeck.toPersistence(),
          resources: gainResources.merge(this.navigationState.botResources)
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

<style lang="scss" scoped>
.passInfo {
  margin-top: 15px;
  display: flex;
  gap: 1rem;
  .icon {
    height: 4rem;
  }
}
</style>
