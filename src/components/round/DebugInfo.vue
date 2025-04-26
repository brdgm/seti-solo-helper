<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>card</b>: {{botActions.currentCard ?? '-'}}<br/>
      <b>valid actions</b>: {{botActions.actions}}<br/>
      <b>deck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>resources</b>: {{resources}}<br/>
      <b>gain resources</b>: {{gainResources}}<br/>
      <b>objectives</b>: {{objectiveStack.toPersistence()}}<br/>
      <b>milestones</b>: {{milestoneTracker.toPersistence().milestones}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources, useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import BotActions from '@/services/BotActions'
import ObjectiveStack from '@/services/ObjectiveStack'
import MilestoneTracker from '@/services/MilestoneTracker'

export default defineComponent({
  name: 'DebugInfo',
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
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    objectiveStack() : ObjectiveStack {
      return this.navigationState.objectiveStack
    },
    milestoneTracker() : MilestoneTracker {
      return this.navigationState.milestoneTracker
    },
    botActions() : BotActions {
      return this.navigationState.botActions
    },
    resources() : BotResources {
      return this.navigationState.botResources
    },
    gainResources() : BotResources {
      return this.navigationState.botGainResources.resources
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
