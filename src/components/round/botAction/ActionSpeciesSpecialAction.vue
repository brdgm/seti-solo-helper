<template>
  <ActionBox :currentCard="currentCard" :instruction-title="'Species Special Action...'">
    <template #action>
      Action Species Special Action...
    </template>
    <template #instruction>
      Rules Species Special Action...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionSpeciesSpecialAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionSpeciesSpecialAction',
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
  }
})
</script>

<style lang="scss" scoped>
</style>
