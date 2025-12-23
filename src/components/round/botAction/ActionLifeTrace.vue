<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('botResources.lifeTrace.title')">
    <template #resources v-if="action.progressDifficulty">
      <AppIcon v-for="index in state.setup.difficultyLevel" :key="index" name="progress-1" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <AppIcon type="life-trace" :name="action.lifeTrace" class="icon"/>
      </div>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionLifeTrace } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import TechType from '@/services/enum/TechType'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'ActionLifeTrace',
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
    const state = useStateStore()
    return { t, state }
  },
  props: {
    action: {
      type: Object as PropType<CardActionLifeTrace>,
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
  height: 4rem;
  &.resources {
    height: 1.5rem;
  }
}
.icon.resources + .icon.resources {
  margin-left: -0.6rem;
}
</style>
