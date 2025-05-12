<template>
  <ModalDialog id="speciesDiscoveryModal" :title="t('sideBar.speciesDiscovery.title')">
    <template #body>
      <p v-html="t('sideBar.speciesDiscovery.alreadyDiscovered')"></p>
      <ol>
        <li v-for="alienIndex in 2" :key="alienIndex" class="mt-2">
          <select class="form-select" v-model="state.alienDiscovery.species[alienIndex-1]">
            <option :value="undefined">{{t('sideBar.speciesDiscovery.none')}}</option>
            <option v-for="species in alienSpecies" :key="species" :value="species">{{t(`alienSpecies.${species}`)}}</option>
          </select>
        </li>
      </ol>
      <p class="alert alert-info small" v-if="isSpeciesCentaurians">
        <span class="fw-bold" v-html="t('alienSpecies.centaurians')"></span>:
        <span v-html="t('rules.action.speciesSpecialAction.centaurians.generalInstructions')"></span>
        <CentauriansAddMilestoneTokenButton :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"/>
      </p>
      <p class="alert alert-info small" v-if="isSpeciesExertians">
        <span class="fw-bold" v-html="t('alienSpecies.exertians')"></span>:
        <span v-html="t('rules.action.speciesSpecialAction.exertians.generalInstructions')"></span>
      </p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AlienSpecies from '@/services/enum/AlienSpecies'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import CentauriansAddMilestoneTokenButton from './CentauriansAddMilestoneTokenButton.vue'
import BotGameBoardResources from '@/services/BotGameBoardResources'

export default defineComponent({
  name: 'AlienDiscoveryModal',
  components: {
    ModalDialog,
    CentauriansAddMilestoneTokenButton
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
    alienSpecies() : AlienSpecies[] {
      return getAllEnumValues(AlienSpecies)
    },
    isSpeciesCentaurians() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.CENTAURIANS)
    },
    isSpeciesExertians() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.EXERTIANS)
    }
  }
})
</script>
