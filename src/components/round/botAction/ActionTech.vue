<template>
  <ActionBox>
    <template #summary>
      Action Tech...
    </template>
    <template #rules>
      Rules Tech...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionTech } from '@/services/Card'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionTech',
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
      type: Object as PropType<CardActionTech>,
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
