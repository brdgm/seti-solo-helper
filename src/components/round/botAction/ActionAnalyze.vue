<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.analyze.title')">
    <template #resources v-if="action.victoryPoints == 3 || hasComputerTech">
      <AppIcon v-if="action.victoryPoints == 3" name="vp-3" class="icon resources"/>
      <template v-if="hasComputerTech">
        <AppIcon type="tech-discard" name="analyze" class="icon resources"/>
        <AppIcon name="vp-3" class="icon resources"/>
        <AppIcon name="progress-1" class="icon resources"/>
      </template>
    </template>
    <template #action>
      <div class="action">
        <AppIcon type="action" name="analyze" class="icon"/>
        <AppIcon type="alien-trace" name="computer" class="icon"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.analyze.lifeTrace')"></p>
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
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionAnalyze',
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
  },
  computed: {
    hasComputerTech() : boolean {
      return this.navigationState.botResources.techComputer > 0
    }
  },
  mounted() {
    this.$emit('ready', this.hasComputerTech ? TechType.COMPUTER : undefined)
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
  &.resources {
    height: 1.5rem;
  }
}
</style>
