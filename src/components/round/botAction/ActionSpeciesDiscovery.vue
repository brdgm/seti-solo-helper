<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.speciesDiscovery.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="species-discovery" class="icon"/>
        <div v-html="t('roundTurnBot.checkSpeciesDiscovery', {alienSpeciesIndex})"></div>
      </div>
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
import AppIcon from '@/components/structure/AppIcon.vue'
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionSpeciesDiscovery',
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
  },
  computed: {
    alienSpeciesIndex() : number {
      return this.action.alienSpeciesIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 2.5rem;
}
</style>
