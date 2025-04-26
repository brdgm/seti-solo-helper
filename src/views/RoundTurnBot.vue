<template>
  <SideBar :navigationState="navigationState"/>
  <ObjectivesTopBar :navigationState="navigationState"/>
  <h1>{{t('player.bot')}}</h1>

  <template v-if="botPass">
    <div class="passInfo">
      <AppIcon type="action" name="pass" class="icon"/>
      <div>
        <span v-html="t('roundTurnBot.pass')"></span><br/>
        <span v-if="!isLastRound" v-html="t('roundTurnBot.discardEndOfRoundCard')"></span>
      </div>
    </div>
    <p v-if="isFirstPass" class="mt-2">
      <AppIcon name="rotate-solar-system" class="icon"/>
    </p>
    <BotResources :botGainResources="navigationState.botGainResources"/>
    <BotReachedMilestones :navigationState="navigationState"/>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
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
import isFirstPass from '@/util/isFirstPass'
import BotReachedMilestones from '@/components/round/BotReachedMilestones.vue'
import Action from '@/services/enum/Action'
import ObjectivesTopBar from '@/components/round/ObjectivesTopBar.vue'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    ObjectivesTopBar,
    DebugInfo,
    BotTurn,
    AppIcon,
    BotResources,
    BotReachedMilestones
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, action, player, botPass } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, action, player})

    const isLastRound = (round == 5)
    if (botPass && !isLastRound) {
      navigationState.botGainResources.applyAction({action:Action.PASS})
    }

    return { t, router, navigationState, state, routeCalculator, round, turn, turnOrderIndex, botPass, isLastRound }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    isFirstPass() : boolean {
      return isFirstPass(this.state, this.round, this.turn, this.turnOrderIndex)
    }
  },
  methods: {
    next(action?: CardAction, techType?: TechType) : void {
      const cardDeck = this.navigationState.cardDeck
      const previousTurnResources = this.navigationState.botResources
      const gainResources = this.navigationState.botGainResources
      if (this.botPass) {
        gainResources.applyAction({action:Action.PASS})
      }
      else if (action) {
        gainResources.applyAction(action, techType, this.navigationState.botActions.currentCard?.alienSpecies)
      }
      const drawAdvancedCards = gainResources.getDrawAdvancedCardCount(previousTurnResources)
      cardDeck.addAdvancedCards(drawAdvancedCards)

      const objectiveStack = this.navigationState.objectiveStack
      objectiveStack.checkCompletedObjectives()

      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        player:this.navigationState.player,
        botPersistence: {
          cardDeck: cardDeck.toPersistence(),
          objectiveStack: objectiveStack.toPersistence(),
          milestoneTracker: this.navigationState.milestoneTracker.toPersistence(),
          resources: gainResources.merge(previousTurnResources)
        },
        pass: this.botPass ? true : undefined
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
  align-items: center;
}
.icon {
  height: 4rem;
}
</style>
