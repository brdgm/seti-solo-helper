<template>
  <div class="actionItem">
    <component :is="componentName" :action="action"
        :currentCard="currentCard" :navigationState="navigationState" :botGameBoardResources="botGameBoardResources"
        @ready="(techType:TechType) => $emit('ready', techType)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import NavigationState from '@/util/NavigationState'
import { useI18n } from 'vue-i18n'
import Card, { CardAction } from '@/services/Card'
import ActionTech from './botAction/ActionTech.vue'
import ActionLaunch from './botAction/ActionLaunch.vue'
import ActionProbe from './botAction/ActionProbe.vue'
import ActionTelescope from './botAction/ActionTelescope.vue'
import ActionAnalyze from './botAction/ActionAnalyze.vue'
import ActionSpeciesDiscovery from './botAction/ActionSpeciesDiscovery.vue'
import ActionSpeciesSpecialActionMascamites from './botAction/ActionSpeciesSpecialActionMascamites.vue'
import ActionSpeciesSpecialActionAnomalies from './botAction/ActionSpeciesSpecialActionAnomalies.vue'
import ActionSpeciesSpecialActionCentaurians from './botAction/ActionSpeciesSpecialActionCentaurians.vue'
import ActionSpeciesSpecialActionExertians from './botAction/ActionSpeciesSpecialActionExertians.vue'
import TechType from '@/services/enum/TechType'
import Action from '@/services/enum/Action'
import BotGameBoardResources from '@/services/BotGameBoardResources'

export default defineComponent({
  name: 'BotAction',
  components: {
    ActionTech,
    ActionLaunch,
    ActionProbe,
    ActionTelescope,
    ActionAnalyze,
    ActionSpeciesDiscovery,
    ActionSpeciesSpecialActionMascamites,
    ActionSpeciesSpecialActionAnomalies,
    ActionSpeciesSpecialActionCentaurians,
    ActionSpeciesSpecialActionExertians
  },
  emits: {
    ready: (_techType?: TechType) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    },
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
    componentName() : string {
      if (this.action.action == Action.SPECIES_SPECIAL_ACTION) {
        return `action-${this.action.action}-${this.currentCard.alienSpecies}`
      }
      return `action-${this.action.action}`
    }
  }
})
</script>

<style lang="scss" scoped>
.actionItem {
  margin-top: 15px;
  max-width: 38rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
</style>
