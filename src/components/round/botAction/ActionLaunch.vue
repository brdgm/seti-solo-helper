<template>
  <ActionBox :instruction-title="'Launch...'">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="launch" class="icon"/>
        <AppIcon v-if="action.publicity == 1" name="publicity-1" class="icon"/>
        <AppIcon v-if="action.progress == 1" name="progress-1" class="icon"/>
      </div>
    </template>
    <template #instruction>
      Rules Launch...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionLaunch } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionLaunch',
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
      type: Object as PropType<CardActionLaunch>,
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
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 4rem;
}
</style>
