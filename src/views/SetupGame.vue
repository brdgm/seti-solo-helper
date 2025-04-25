<template>
  <h1>{{t('setupGame.title')}}</h1>

  <div class="instructions mt-4">
    <ol>
      <li v-html="t('setupGame.setup2Players')"></li>
      <ul>
        <li v-html="t(`setupGame.startPlayer.${startPlayer}`)"></li>
        <li v-html="t('setupGame.playerScoreTrackSetup', {space:playerScoreTrackSpace})"></li>
      </ul>
      <li v-html="t('setupGame.rivalPieces')"></li>
      <ul>
        <li v-html="t('setupGame.componentsNotRequired')"></li>
      </ul>
      <li v-if="hasObjectives" v-html="t('setupGame.objectiveStack')"></li>
    </ol>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col alert alert-primary">
        <h4>{{t('setupGame.ruleChanges.title')}}</h4>
        <ul>
          <li v-html="t('setupGame.ruleChanges.resources')"></li>
          <li v-if="hasObjectives" v-html="t('setupGame.ruleChanges.objectives')"></li>
        </ul>
      </div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGameBoard" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
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
    hasObjectives() : boolean {
      return this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    },
    playerScoreTrackSpace() : number {
      return this.startPlayer == Player.PLAYER ? 1 : 2
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
