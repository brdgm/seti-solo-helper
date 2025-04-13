<template>
  <ActionBox :instruction-title="'Species Discovery...'">
    <template #action>
      Action Species Discovery...
    </template>
    <template #instruction>
      Rules Species Discovery...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionSpeciesDiscovery } from '@/services/Card'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionSpeciesDiscovery',
  inheritAttrs: false,
  components: {
    ActionBox
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardActionSpeciesDiscovery>,
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
</style>
