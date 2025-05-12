<template>
  <SideBar :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
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
    <BotResources v-model="botGameBoardResources"/>
    <BotReachedMilestones :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
      {{t('action.next')}}
    </button>
  </template>

  <template v-else-if="botActions.currentCard">
    <BotAction :action="currentAction" :currentCard="botActions.currentCard" :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"
        :key="JSON.stringify(state.alienDiscovery.species)" @ready="ready"/>

    <BotResources v-if="showBotResources" v-model="botGameBoardResources"/>
    <BotReachedMilestones :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>

    <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()" v-if="actionReady">
      {{t('roundTurnBot.executed')}}
    </button>

    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossibleCheckConfirm()" v-if="hasMoreActions">
      {{t('roundTurnBot.notPossible')}}
    </button>
  </template>

  <ModalDialog id="botNotPossibleConfirmModal" :title="t('roundTurnBot.notPossibleConfirm.title')">
    <template #body>
      <p v-html="t('roundTurnBot.notPossibleConfirm.confirm')"></p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="notPossible()" data-bs-dismiss="modal">{{t('roundTurnBot.notPossibleConfirm.title')}}</button>
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
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import { Tooltip } from 'bootstrap'
import AppIcon from '@/components/structure/AppIcon.vue'
import { CardAction } from '@/services/Card'
import TechType from '@/services/enum/TechType'
import BotResources from '@/components/round/BotResources.vue'
import isFirstPass from '@/util/isFirstPass'
import BotReachedMilestones from '@/components/round/BotReachedMilestones.vue'
import Action from '@/services/enum/Action'
import ObjectivesTopBar from '@/components/round/ObjectivesTopBar.vue'
import BotGameBoardResources from '@/services/BotGameBoardResources'
import BotAction from '@/components/round/BotAction.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import hasBotGameBoardResources from '@/util/hasBotGameBoardResources'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    FooterButtons,
    SideBar,
    ObjectivesTopBar,
    DebugInfo,
    AppIcon,
    BotResources,
    BotReachedMilestones,
    BotAction,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, action, player, botPass, botActions } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, action, player})

    const isLastRound = (round == 5)
    if (botPass && !isLastRound) {
      navigationState.botActionResources.applyAction({action:Action.PASS})
    }

    return { t, router, navigationState, state, routeCalculator, round, turn, turnOrderIndex, botPass, botActions, isLastRound }
  },
  data() {
    return {
      botGameBoardResources: {} as BotGameBoardResources,
      actionReady: false,
      actionTechType: undefined as TechType|undefined,
    }
  },
  computed: {
    currentAction() : CardAction {
      return this.navigationState.botActions.actions[this.navigationState.action]
    },
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    isFirstPass() : boolean {
      return isFirstPass(this.state, this.round, this.turn, this.turnOrderIndex)
    },
    hasMoreActions() : boolean {
      return this.navigationState.action < this.botActions.actions.length - 1
    },
    showBotResources() : boolean {
      return [Action.TECH, Action.PROBE, Action.TELESCOPE, Action.ANALYZE, Action.SPECIES_SPECIAL_ACTION].includes(this.currentAction.action)
    }
  },
  methods: {
    executed() : void {
      this.next(this.currentAction, this.actionTechType)
    },
    next(action?: CardAction, techType?: TechType) : void {
      const cardDeck = this.navigationState.cardDeck
      const previousTurnResources = this.navigationState.botResources
      const botActionResources = this.navigationState.botActionResources
      if (this.botPass) {
        botActionResources.applyAction({action:Action.PASS})
      }
      else if (action) {
        botActionResources.applyAction(action, techType, this.navigationState.botActions.currentCard?.alienSpecies)
      }
      const drawAdvancedCards = botActionResources.getDrawAdvancedCardCount(previousTurnResources, this.botGameBoardResources)
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
          resources: botActionResources.merge(previousTurnResources, this.botGameBoardResources)
        },
        pass: this.botPass ? true : undefined
      })
      this.router.push(this.routeCalculator.getNextRouteTo(this.state))
    },
    notPossibleCheckConfirm() : void {
      if (hasBotGameBoardResources(this.botGameBoardResources)) {
        showModal('botNotPossibleConfirmModal')
      }
      else {
        this.notPossible()
      }
    },
    notPossible() : void {
      this.router.push(this.routeCalculator.getNextActionRouteTo(this.state))
    },
    ready(techType?: TechType) : void {
      this.actionReady = true
      this.actionTechType = techType
      this.navigationState.botActionResources.applyAction(this.currentAction, techType, this.botActions.currentCard?.alienSpecies)
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
