<template>
  <ActionBox :instruction-title="'Probe...'">
    <template #action>
      Action Probe...
    </template>
    <template #instruction>
      Rules Probe...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionProbe } from '@/services/Card'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionProbe',
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
      type: Object as PropType<CardActionProbe>,
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
