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
        <button class="btn btn-info btn-sm mt-2" v-if="!hasCentauriansMilestone" @click="addCentauriansMilestone">{{t(`sideBar.speciesDiscovery.addCentauriansMilestone`)}}</button>
      </p>
      <p class="alert alert-info small" v-if="isSpeciesExertians">
        <span class="fw-bold" v-html="t('alienSpecies.exertians')"></span>:
        <span v-html="t('rules.action.speciesSpecialAction.exertians.generalInstructions')"></span>
      </p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AlienSpecies from '@/services/enum/AlienSpecies'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import MilestoneType from '@/services/enum/MilestoneType'

export default defineComponent({
  name: 'AlienDiscoveryModal',
  components: {
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
    alienSpecies() : AlienSpecies[] {
      return getAllEnumValues(AlienSpecies)
    },
    isSpeciesCentaurians() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.CENTAURIANS)
    },
    isSpeciesExertians() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.EXERTIANS)
    },
    hasCentauriansMilestone() : boolean {
      return this.navigationState.milestoneTracker.milestones.find(m => m.type == MilestoneType.CENTAURIANS) !== undefined
    }
  },
  methods: {
    addCentauriansMilestone() : void {
      const newVP = this.navigationState.botGainResources.merge(this.navigationState.botResources).vp
      this.navigationState.milestoneTracker.add({type: MilestoneType.CENTAURIANS, score: newVP + 15})
    }
  }
})
</script>
