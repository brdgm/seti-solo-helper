<template>
  <ActionBox :currentCard="currentCard" :instruction-title="'Probe...'">
    <template #action>
      <div class="action">
        <AppIcon :name="`movement-points-${action.movementPoints}`" class="icon"/>
        <template v-for="(planet,index) in action.planets" :key="planet">
          <AppIcon v-if="index > 0" name="probe-next" class="icon"/>
          <div class="planet">
            <AppIcon type="planet" :name="planet" class="icon"/>
            <div class="name">{{planet}}</div>
          </div>
        </template>
      </div>
      <div class="action mt-3">
        <AppIcon type="action" name="probe-tech-discard" class="icon"/>
        <template v-for="probeAction in action.probeActions" :key="probeAction">
          <AppIcon name="probe-next" class="icon"/>
          <AppIcon type="probe-action" :name="probeAction" class="icon"/>
        </template>
      </div>
    </template>
    <template #instruction>
      Rules Probe...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionProbe } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionProbe',
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
      type: Object as PropType<CardActionProbe>,
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
  height: 3rem;
}
.planet {
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    text-transform: uppercase;
    font-size: 11px;
  }
}
</style>
