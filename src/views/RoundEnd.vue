<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundEnd.title')}}</h1>

  <p class="mt-4">...</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

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

export default defineComponent({
  name: 'RoundEnd',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    return { t, router, state, navigationState, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    isLastRound() : boolean {
      return this.round == 5
    }
  },
  methods: {
    next() : void {
      if (this.isLastRound) {
        this.router.push('/endOfGame')
      }
      else {
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
        const initialBotPersistence : BotPersistence = {
          cardDeck: cardDeck.toPersistence()
        }
        this.state.storeRound({
          round: nextRound,
          startPlayer,
          turns: [],
          initialBotPersistence
        })
        const routeCalculator = new RouteCalculator({round:2})
        this.router.push(routeCalculator.getFirstTurnRouteTo(this.state))
      }
    }
  }
})
</script>
