<template>
  <div class="sidebar">
    {{t('sideBar.round', {round})}}<br/>
    {{t('sideBar.turn', {turn})}}<br/>
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
      <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#discoverAliensModal">{{t('sideBar.discover')}}</button>
    </div>
    <hr/>
    <div class="rival">
      <h6>{{t('sideBar.rival.title')}}</h6>
      <span class="cardCount">{{cardDeck.discard.length}}</span> / <span class="cardCount">{{cardDeck.pile.length+cardDeck.discard.length}}</span><br/>
      <AppIcon type="progress" :name="progressCount.toString()" class="icon"/>: {{progressCount}}/12<br/>
      <AppIcon type="resource" name="publicity" class="icon"/>: {{resources.publicity}}<br/>
      <AppIcon type="resource" name="data" class="icon"/>: {{resources.data}}<br/>
      <AppIcon type="resource" name="vp" class="icon"/>: {{resources.vp}}<br/>
      <AppIcon type="tech" name="probe" class="icon tech" v-for="item of resources.techProbe" :key="item"/>
      <AppIcon type="tech" name="telescope" class="icon tech" v-for="item of resources.techTelescope" :key="item"/>
      <AppIcon type="tech" name="computer" class="icon tech" v-for="item of resources.techComputer" :key="item"/>
    </div>
  </div>

  <ModalDialog id="discoverAliensModal" :title="t('sideBar.speciesDiscovery.title')">
    <template #body>
      <p v-html="t('sideBar.speciesDiscovery.alreadyDiscovered')"></p>
      <ol>
        <li v-for="alienIndex in 2" :key="alienIndex" class="mt-2">
          <select class="form-select" v-model="state.alienDiscovery.species[alienIndex-1]">
            <option :value="undefined">{{t(`sideBar.speciesDiscovery.none`)}}</option>
            <option v-for="species in alienSpecies" :key="species" :value="species">{{t(`alienSpecies.${species}`)}}</option>
          </select>
        </li>
      </ol>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AlienSpecies from '@/services/enum/AlienSpecies'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon,
    ModalDialog
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
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    },
    alienSpecies() : AlienSpecies[] {
      return getAllEnumValues(AlienSpecies)
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    resources() : BotResources {
      return this.navigationState.botResources
    },
    progressCount() : number {
      return (this.resources.progress+1) % 12 - 1
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
  }
}
</style>
