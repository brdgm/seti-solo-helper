<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <StartPlayer/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('setupGameBoard.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Round, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import { useRouter } from 'vue-router'
import StartPlayer from '@/components/setup/StartPlayer.vue'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import getInitialBotResources from '@/util/getInitialBotResources'
import getRandomGoldScoreTileSetup from '@/util/getRandomGoldScoreTileSetup'
import ObjectiveStack from '@/services/ObjectiveStack'
import MilestoneTracker from '@/services/MilestoneTracker'

export default defineComponent({
  name: 'SetupApp',
  components: {
    FooterButtons,
    DifficultyLevel,
    StartPlayer
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  methods: {
    setupGame() : void {
      this.state.resetGame()
      this.state.setup.goldScoreTileSetup = getRandomGoldScoreTileSetup()
      // prepare round 1
      const startPlayer = this.state.setup.startPlayer ?? randomEnum(Player)
      const round : Round = {
        round: 1,
        startPlayer,
        initialBotPersistence: {
          cardDeck: CardDeck.new(this.state.setup.difficultyLevel).toPersistence(),
          objectiveStack: ObjectiveStack.new(this.state.setup.difficultyLevel).toPersistence(),
          milestoneTracker: MilestoneTracker.new().toPersistence(),
          resources: getInitialBotResources(startPlayer)
        },
        turns: []
      }
      this.state.storeRound(round)
      this.router.push('/setupGameBoard')
    }
  }
})
</script>
