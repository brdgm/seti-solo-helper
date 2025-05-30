<template>
  <div class="sidebar">
    {{t('sideBar.round', {round})}}<br/>
    <template v-if="turn > 0">{{t('sideBar.turn', {turn})}}<br/></template>
    <hr/>
    <div class="aliens">
      <h6>{{t('sideBar.species')}}</h6>
      <ol>
        <li v-for="alienIndex in 2" :key="alienIndex">
          <span v-if="state.alienDiscovery.species[alienIndex-1]">
            {{t(`alienSpecies.${state.alienDiscovery.species[alienIndex-1]}`)}}
          </span>
          <template v-else>
            <AppIcon type="action" name="species-discovery" class="icon"/> ?
          </template>
        </li>
      </ol>
      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#speciesDiscoveryModal">{{t('sideBar.discover')}}</button>
    </div>
    <hr/>
    <div class="rival">
      <h6>{{t('sideBar.rival.title')}}</h6>
      <span class="cardCount">{{cardDeck.discard.length}}</span> / <span class="cardCount">{{cardDeck.pile.length+cardDeck.discard.length}}</span>
        <AppIcon v-if="currentCard" type="decision-direction" :name="currentCard.decisionDirection" class="icon decision"/><br/>
      <AppIcon :type="progressType" :name="progressCount.toString()" class="icon"/>: {{progressCount}}/12<br/>
      <AppIcon type="resource" name="publicity" class="icon"/>: {{resources.publicity}}<br/>
      <AppIcon type="resource" name="data" class="icon"/>: {{resources.data}}<br/>
      <AppIcon type="resource" name="vp" class="icon"/>: {{resources.vp}}<br/>
      <AppIcon type="tech" name="probe" class="icon tech" v-for="item of resources.techProbe" :key="item"/>
      <AppIcon type="tech" name="telescope" class="icon tech" v-for="item of resources.techTelescope" :key="item"/>
      <AppIcon type="tech" name="computer" class="icon tech" v-for="item of resources.techComputer" :key="item"/>
    </div>
  </div>

  <SpeciesDiscoveryModal :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '../structure/AppIcon.vue'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'
import SpeciesDiscoveryModal from './SpeciesDiscoveryModal.vue'
import BotGameBoardResources from '@/services/BotGameBoardResources'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon,
    SpeciesDiscoveryModal
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botGameBoardResources: {
      type: Object as PropType<BotGameBoardResources>,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    currentCard() : Card|undefined {
      return this.navigationState.botActions.currentCard
    },
    resources() : BotResources {
      return this.navigationState.botResources
    },
    progressCount() : number {
      return (this.resources.progress-1) % 12 + 1
    },
    difficultyLevel() : DifficultyLevel {
      return this.state.setup.difficultyLevel
    },
    progressType() : string {
      if ([DifficultyLevel.LEVEL_3, DifficultyLevel.LEVEL_5].includes(this.difficultyLevel)) {
        return `progress-level-${this.difficultyLevel}`
      }
      return 'progress'
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 120px;
  }
}
.aliens {
  ol {
    padding-left: 15px;
  }
  .icon {
    height: 1.5rem;
  }
}
.rival {
  .cardCount {
    display: inline-block;
    border: 1px solid black;
    border-radius: 3px;
    width: 1.1rem;
    height: 1.6rem;
    text-align: center;
    background-color: #797ca4;
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .icon {
    height: 1.5rem;
    width: 1.7rem;
    object-fit: contain;
    &.tech {
      height: 2.25rem;
      margin-top: 0.25rem;
    }
    &.decision {
      width: 1.25rem;
      object-fit: contain;
      margin-left: 0.25rem;
    }
  }
}
</style>
