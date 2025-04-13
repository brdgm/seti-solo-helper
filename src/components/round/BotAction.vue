<template>
  <div class="actionBox upper">
    <h5>{{t(`botAction.${action.action}.title`)}}</h5>
  </div>
  <div class="actionBox lower">
    <component :is="`action-${action.action}`" :action="action"
        :currentCard="currentCard" :navigationState="navigationState"/>
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
import ActionSpeciesSpecialAction from './botAction/ActionSpeciesSpecialAction.vue'

export default defineComponent({
  name: 'BotAction',
  components: {
    ActionTech,
    ActionLaunch,
    ActionProbe,
    ActionTelescope,
    ActionAnalyze,
    ActionSpeciesDiscovery,
    ActionSpeciesSpecialAction
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
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  border: 2px solid #9ca1af;
  padding: 15px;
  background-color: #c3cce8;
  &.upper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &.lower {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 0;
  }
}
.actionIcon {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}
</style>
