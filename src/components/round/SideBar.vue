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
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AlienSpecies from '@/services/enum/AlienSpecies'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

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
</style>
