<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.speciesSpecialAction.centaurians.title')">
    <template #resources>
      <AppIcon name="progress-1" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <p><b>Centraurians:</b> If the rival still has a message milestone in his reserve and none on the scoring track, place one message milestone 15 points ahead of their current score.</p>
      </div>
    </template>
    <template #instruction>
      Rules Species Special Action...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionSpeciesSpecialAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import TechType from '@/services/enum/TechType'
import AppIcon from '@/components/structure/AppIcon.vue'
import ProbeAction from '@/services/enum/ProbeAction'

export default defineComponent({
  name: 'ActionSpeciesSpecialActionCentaurians',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon
  },
  emits: {
    ready: (_techType?: TechType) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()

    const selectedProbeAction = ref(undefined as ProbeAction|undefined)

    return { t, selectedProbeAction }
  },
  props: {
    action: {
      type: Object as PropType<CardActionSpeciesSpecialAction>,
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
  },
  mounted() {
    this.$emit('ready')
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 3rem;
  &.resources {
    height: 1.5rem;
  }
}
</style>
