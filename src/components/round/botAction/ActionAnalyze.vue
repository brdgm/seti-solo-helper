<template>
  <ActionBox :currentCard="currentCard" :instruction-title="'Analyze...'">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="analyze" class="icon"/>
        <AppIcon v-if="action.victoryPoints == 3" name="vp-3" class="icon"/>
        <span class="plus">+</span>
        <AppIcon type="action" name="analyze-tech-discard" class="icon"/>
      </div>
    </template>
    <template #instruction>
      Rules Analyze...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionAnalyze } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionAnalyze',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardActionAnalyze>,
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
  gap: 5px;
}
.icon {
  height: 4rem;
}
.plus {
  font-size: 30px;
  color: grey;
}
</style>
