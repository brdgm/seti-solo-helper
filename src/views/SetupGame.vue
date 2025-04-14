<template>
  <h1>{{t('setupGame.title')}}</h1>

  <div class="instructions mt-4">
    <ol>
      <li v-html="t('setupGame.setup2Players')"></li>
      <ul>
        <li v-html="t(`setupGame.startPlayer.${startPlayer}`)"></li>
      </ul>
      <li v-html="t('setupGame.rivalPieces')"></li>
      <ul>
        <li v-html="t('setupGame.rivalScoreCounter', {scoreTrackField:botScoreTrackField})"></li>
        <li v-html="t('setupGame.componentsNotRequired')"></li>
      </ul>
      <template v-if="hasObjectives">
        <li v-html="t('setupGame.objectiveStack.title')"></li>
        <ul>
          <li v-html="t('setupGame.objectiveStack.top', {count:difficultyLevelSettings.objectivesLevel1})"></li>
          <li v-html="t('setupGame.objectiveStack.middle', {count:difficultyLevelSettings.objectivesLevel2})"></li>
          <li v-html="t('setupGame.objectiveStack.bottom', {count:difficultyLevelSettings.objectivesLevel3})"></li>
        </ul>
        <li v-html="t('setupGame.objectiveStack.draw')"></li>
      </template>
    </ol>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setup" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import RouteCalculator from '@/services/RouteCalculator'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    startPlayer() : Player {
      const round1 = this.state.rounds.find(round => round.round == 1)
      return round1?.startPlayer ?? Player.PLAYER
    },
    botScoreTrackField() : number {
      return this.startPlayer == Player.PLAYER ? 2 : 1
    },
    difficultyLevelSettings() : DifficultyLevelSettings {
      return getDifficultyLevelSettings(this.state.setup.difficultyLevel)
    },
    hasObjectives() : boolean {
      return this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    }
  },
  methods: {
    setupBot() : void {
      const routeCalculator = new RouteCalculator({round:1})
      this.router.push(routeCalculator.getFirstTurnRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
