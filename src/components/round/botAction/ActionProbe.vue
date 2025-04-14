<template>
  <ActionBox :currentCard="currentCard" :instruction-title="'Probe...'">
    <template #resources v-if="showLanderMoon">
      <AppIcon type="tech-discard" name="probe" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <AppIcon :name="`movement-points-${action.movementPoints}`" class="icon"/>
        <template v-for="(planet,index) in action.planets" :key="planet">
          <AppIcon v-if="index > 0" name="probe-next" class="icon"/>
          <div class="planet">
            <AppIcon type="planet" :name="planet" class="icon"/>
            <div class="name">{{t(`planet.${planet}`)}}</div>
          </div>
        </template>
      </div>
      <div class="action mt-3">
        <AppIcon type="probe-action" name="lander-moon" class="icon" v-if="showLanderMoon"/>
        <template v-for="(probeAction,index) in action.probeActions" :key="probeAction">
          <AppIcon v-if="showLanderMoon || index > 0" name="probe-next" class="icon"/>
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
import Planet from '@/services/enum/Planet'
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionProbe',
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
  },
  computed: {
    showLanderMoon() : boolean {
      return this.hasProbeTech && this.action.planets.filter(planet => planet != Planet.OUMUAMUA).length > 0
    },
    hasProbeTech() : boolean {
      return this.navigationState.botResources.techProbe > 0
    }
  },
  mounted() {
    this.$emit('ready', this.showLanderMoon ? TechType.PROBE : undefined)
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
  height: 3rem;
  &.resources {
    height: 1.5rem;
  }
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
