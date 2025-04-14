<template>
  <ActionBox :currentCard="currentCard" :instruction-title="'Tech...'">
    <template #resources v-if="action.publicityCost == 6 || action.progress == 1">
      <AppIcon v-if="action.publicityCost == 6" name="publicity-cost-6" class="icon resources"/>
      <AppIcon v-if="action.progress == 1" name="progress-1" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <AppIcon type="action" name="tech" class="icon"/>
        <AppIcon name="rotate-solar-system" class="icon"/>
      </div>
    </template>
    <template #instruction>
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
import AppIcon from '@/components/structure/AppIcon.vue'
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionTech',
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
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 4rem;
  &.resources {
    height: 1.5rem;
  }
}
</style>
