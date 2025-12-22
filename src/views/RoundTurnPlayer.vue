<template>
  <SideBar :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
  <ObjectivesTopBar :navigationState="navigationState"/>
  <h1>{{t('player.player')}}</h1>

  <p class="mt-4" v-html="t('roundTurnPlayer.execute')"></p>

  <BotResources v-model="botGameBoardResources"/>
  <BotReachedMilestones :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
  
  <button class="btn btn-primary btn-lg mt-4" @click="next">
    {{t('action.next')}}
  </button>
  <button class="btn btn-outline-danger btn-lg mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#passModal">
    {{t('action.pass')}}
  </button>

  <ModalDialog id="passModal" :title="t('action.pass')">
    <template #body>
      <p v-html="t('roundTurnPlayer.passConfirm')"></p>
      <p v-if="isFirstPass">
        <AppIcon name="rotate-solar-system" class="icon"/>
      </p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="pass" data-bs-dismiss="modal">{{t('action.pass')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import RouteCalculator from '@/services/RouteCalculator'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import BotResources from '@/components/round/BotResources.vue'
import isFirstPass from '@/util/isFirstPass'
import AppIcon from '@/components/structure/AppIcon.vue'
import BotReachedMilestones from '@/components/round/BotReachedMilestones.vue'
import ObjectivesTopBar from '@/components/round/ObjectivesTopBar.vue'
import BotGameBoardResources from '@/services/BotGameBoardResources'

export default defineComponent({
  name: 'RoundTurnPlayer',
  components: {
    FooterButtons,
    BotResources,
    BotReachedMilestones,
    ModalDialog,
    SideBar,
    ObjectivesTopBar,
    DebugInfo,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, player } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, player}, state.setup.expansions ?? [])

    return { t, router, navigationState, state, routeCalculator, round, turn, turnOrderIndex, player }
  },
  data() {
    return {
      botGameBoardResources: {} as BotGameBoardResources
    }
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
    next() : void {
      this.nextWithPassed(false)
    },
    pass() : void {
      this.nextWithPassed(true)
    },
    nextWithPassed(passed : boolean) {
      const cardDeck = this.navigationState.cardDeck
      const previousTurnResources = this.navigationState.botResources
      const botActionResources = this.navigationState.botActionResources
      const drawAdvancedCards = botActionResources.getDrawAdvancedCardCount(previousTurnResources, this.botGameBoardResources)
      cardDeck.addAdvancedCards(drawAdvancedCards)

      const objectiveStack = this.navigationState.objectiveStack
      objectiveStack.checkCompletedObjectives()

      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        player:this.navigationState.player,
        pass: passed ? true : undefined,
        botPersistence: {
          cardDeck: cardDeck.toPersistence(),
          objectiveStack: objectiveStack.toPersistence(),
          milestoneTracker: this.navigationState.milestoneTracker.toPersistence(),
          resources: botActionResources.merge(previousTurnResources, this.botGameBoardResources)
        }
      })
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>


<style lang="scss" scoped>
.icon {
  height: 4rem;
}
</style>
