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
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionSpeciesSpecialAction',
  inheritAttrs: false,
  components: {
    ActionBox
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
</style>
