<template>
  <ActionBox :currentCard="currentCard" :instruction-title="'Telescope...'">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="telescope" class="icon"/>
        <AppIcon v-for="scanSector of action.scanSector" :key="scanSector" type="scan-sector" :name="scanSector" class="icon scan"/>
      </div>
      <div class="action">
        <span class="plus">+</span>
        <AppIcon type="action" name="telescope-tech-discard" class="icon"/>
      </div>
    </template>
    <template #instruction>
      Rules Telescope...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionTelescope } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionTelescope',
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
      type: Object as PropType<CardActionTelescope>,
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
  &.scan {
    height: 3rem;
  }
}
.plus {
  font-size: 30px;
  color: grey;
}
</style>
