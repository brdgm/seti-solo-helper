<template>
  <button class="btn btn-secondary btn-sm mt-2" v-if="!hasCentauriansMilestone" @click="addCentauriansMilestone">{{t(`rules.action.speciesSpecialAction.centaurians.addMilestone`)}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import MilestoneType from '@/services/enum/MilestoneType'

export default defineComponent({
  name: 'CentauriansAddMilestoneTokenButton',
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
