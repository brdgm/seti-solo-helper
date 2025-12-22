<template>
  <button class="btn btn-secondary btn-sm mt-2" v-if="!hasCentauriansMilestone" @click="addCentauriansMilestone">{{t(`rules.action.speciesSpecialAction.centaurians.addMilestone`)}}</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import MilestoneType from '@/services/enum/MilestoneType'
import BotGameBoardResources from '@/services/BotGameBoardResources'

export default defineComponent({
  name: 'CentauriansAddMilestoneTokenButton',
  setup() {
    const { t } = useI18n()
    return { t }
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
    hasCentauriansMilestone() : boolean {
      return this.navigationState.milestoneTracker.milestones.some(m => m.type == MilestoneType.CENTAURIANS)
    }
  },
  methods: {
    addCentauriansMilestone() : void {
      const newVP = this.navigationState.botActionResources.merge(this.navigationState.botResources, this.botGameBoardResources).vp
      this.navigationState.milestoneTracker.add({type: MilestoneType.CENTAURIANS, score: newVP + 15})
    }
  }
})
</script>
