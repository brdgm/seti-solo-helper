<template>
  <h1>{{t('setupGameBoard.title')}}</h1>
  
  <h3>{{t('setupGameBoard.solarSystem.title')}}</h3>
  <a href="https://cge.as/seti-solarsystem" target="_blank" rel="noopener" class="btn btn-secondary">{{t('setupGameBoard.solarSystem.randomizerApp')}}</a>

  <GoldScoringTiles/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('setupGame.title')}}
  </button>

  <FooterButtons backButtonRouteTo="/setup" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import GoldScoringTiles from '@/components/setup/GoldScoringTiles.vue'

export default defineComponent({
  name: 'SetupGameBoard',
  components: {
    FooterButtons,
    GoldScoringTiles
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    return { t, router }
  },
  methods: {
    setupGame() : void {
      this.router.push('/setupGame')
    }
  }
})
</script>
