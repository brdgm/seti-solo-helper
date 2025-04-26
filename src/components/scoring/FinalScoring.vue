<template>
  <div class="tableWrapper">
    <table>
      <tbody>
        <template v-if="isSpeciesExertians">
          <tr>
            <th scope="col">
              <h5 class="mt-2">{{t('gameEnd.gameStatus.title')}}</h5>
            </th>
            <th scope="col">
              <span class="fw-bold">{{t('player.player')}}</span>
            </th>
            <th scope="col">
              <span class="fw-bold">{{t('player.bot')}}</span>
            </th>
          </tr>
          <tr>
            <th scope="row">
              <span v-html="t('gameEnd.gameStatus.exertianDanger')"></span>
            </th>
            <td>
              <NumberInput v-model="playerExertianDanger"/>
            </td>
            <td>
              <NumberInput v-model="botExertianDanger"/>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="fst-italic small" v-html="t('gameEnd.gameStatus.exterianRivalCards')"></td>
          </tr>
        </template>
        <tr>
          <th scope="col">
            <h5 class="mt-2">{{t('gameEnd.finalScoring.title')}}</h5>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('player.player')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('player.bot')}}</span>
          </th>
        </tr>
        <tr v-if="hasObjectives && uncompletedObjectives > 0">
          <th scope="row">
            <span v-html="t('gameEnd.gameStatus.uncompletedObjectives', {count:uncompletedObjectives}, uncompletedObjectives)"></span><br/>
          </th>
          <td></td>
          <td>
            {{botObjectivesVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.finalScoring.scoreTrack')"></span><br/>
          </th>
          <td>
            <NumberInput v-model="playerScoreTrackVP"/>
          </td>
          <td>
            {{botScoreTrackVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.finalScoring.endGameScoringCards')"></span><br/>
          </th>
          <td>
            <NumberInput v-model="playerCardsVP"/>
          </td>
          <td></td>
        </tr>
        <tr v-for="index of 3" :key="index">
          <th scope="row">
            <span v-html="t('gameEnd.finalScoring.goldScoringTile', {index})"></span><br/>
          </th>
          <td>
            <NumberInput v-model="playerGoldTileVP[index-1]"/>
          </td>
          <td></td>
        </tr>
        <template v-if="isSpeciesExertians">
          <tr>
            <th scope="row">
              <span v-html="t('gameEnd.finalScoring.exertianVP')"></span>
            </th>
            <td>
              <NumberInput v-model="playerExertianVP"/>
            </td>
            <td>
              <NumberInput v-model="botExertianVP"/>
            </td>
          </tr>
          <tr>
            <th scope="row">
              {{t('gameEnd.finalScoring.exertianMinus')}}
            </th>
            <td>
              <template v-if="playerExertianMinus > 0">{{-playerExertianMinus}}</template>
            </td>
            <td>
              <template v-if="botExertianMinus > 0">{{-botExertianMinus}}</template>
            </td>
          </tr>
        </template>
        <tr>
          <th scope="row" class="fw-bold">
            {{t('gameEnd.finalScoring.totalVP')}}
          </th>
          <td class="fw-bold">
            {{playerTotalVP}}
          </td>
          <td class="fw-bold">
            {{botTotalVP}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import NavigationState from '@/util/NavigationState'
import { useRoute } from 'vue-router'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import AlienSpecies from '@/services/enum/AlienSpecies'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    const playerExertianDanger = ref(undefined as number|undefined)
    const botExertianDanger = ref(undefined as number|undefined)

    const playerScoreTrackVP = ref(undefined as number|undefined)
    const playerCardsVP = ref(undefined as number|undefined)
    const playerGoldTileVP = ref([] as (number|undefined)[])
    const playerExertianVP = ref(undefined as number|undefined)
    const botExertianVP = ref(undefined as number|undefined)

    return { t, state, navigationState, playerExertianDanger, botExertianDanger,
      playerScoreTrackVP, playerCardsVP, playerGoldTileVP, playerExertianVP, botExertianVP }
  },
  data() {
    return {
      coins: [] as number[]
    }
  },
  computed: {
    maxObjectiveCount() : number {
      const { objectivesLevel1, objectivesLevel2, objectivesLevel3 } = getDifficultyLevelSettings(this.state.setup.difficultyLevel)
      return objectivesLevel1 + objectivesLevel2 + objectivesLevel3
    },
    hasObjectives() : boolean {
      return this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    },
    uncompletedObjectives() : number {
      const objectiveStack = this.navigationState.objectiveStack
      return objectiveStack.pile.length + objectiveStack.current.length
    },
    botObjectivesVP() : number {
      return toNumber(this.uncompletedObjectives) * 5
    },
    botScoreTrackVP() : number {
      return this.navigationState.botResources.vp
    },
    isSpeciesExertians() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.EXERTIANS)
    },
    playerPretotalVP() : number {
      return toNumber(this.playerScoreTrackVP)
          + toNumber(this.playerCardsVP)
          + toNumber(this.playerGoldTileVP[0])
          + toNumber(this.playerGoldTileVP[1])
          + toNumber(this.playerGoldTileVP[2])
          + toNumber(this.playerExertianVP)
    },
    botPretotalVP() : number {
      return this.botScoreTrackVP
          + this.botObjectivesVP
          + toNumber(this.botExertianVP)
    },
    maxExertianDanger() : number {
      return Math.max(toNumber(this.playerExertianDanger), toNumber(this.botExertianDanger))
    },
    playerExertianMinus() : number {
      const exertianDanger = toNumber(this.playerExertianDanger);
      if (exertianDanger > 0 && exertianDanger == this.maxExertianDanger) {
        return Math.floor(this.playerPretotalVP * 0.1)
      }
      return 0
    },
    botExertianMinus() : number {
      const exertianDanger = toNumber(this.botExertianDanger);
      if (exertianDanger > 0 && exertianDanger == this.maxExertianDanger) {
        return Math.floor(this.botPretotalVP * 0.1)
      }
      return 0
    },
    playerTotalVP() : number {
      return this.playerPretotalVP - this.playerExertianMinus
    },
    botTotalVP() : number {
      return this.botPretotalVP - this.botExertianMinus
    }
  }
})
</script>

<style lang="scss" scoped>
.tableWrapper {
  overflow-x: auto;
}
th, td {
  text-align: center;
  padding: 0.5rem;
  font-weight: normal;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
