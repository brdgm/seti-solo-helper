<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <StartPlayer/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('setupGame.title')}}
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
      // prepare round 1
      const round : Round = {
        round: 1,
        startPlayer: this.state.setup.startPlayer ?? randomEnum(Player),
        initialCardDeck: CardDeck.new(this.state.setup.difficultyLevel).toPersistence(),
        turns: []
      }
      this.state.storeRound(round)
      this.router.push('/setupGame')
    }
  }
})
</script>
