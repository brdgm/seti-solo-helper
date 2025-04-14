<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.probe.title')">
    <template #resources v-if="isLanderMoonSelected">
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
      <div class="action mt-3" v-if="!showLanderMoon">
        <template v-for="(probeAction,index) in probeActions" :key="probeAction">
          <AppIcon v-if="index > 0" name="probe-next" class="icon"/>
          <AppIcon type="probe-action" :name="probeAction" class="icon"/>
        </template>
      </div>
    </template>
    <template #instruction>
      Rules Probe...
    </template>
  </ActionBox>

  <div class="action mt-2" v-if="showLanderMoon">
    <span v-html="t('roundTurnBot.pickProbeAction')"></span>
    <template v-for="(probeAction,index) in probeActions" :key="probeAction">
      <AppIcon v-if="index > 0" name="probe-next" class="icon"/>
      <button class="btn" @click="pickProbeAction(probeAction)"
          :class="{'btn-primary': !selectedProbeAction, 'btn-secondary': selectedProbeAction == probeAction, 'btn-outline-secondary': selectedProbeAction != probeAction}">
        <AppIcon type="probe-action" :name="probeAction" class="icon"/>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionProbe } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import Planet from '@/services/enum/Planet'
import TechType from '@/services/enum/TechType'
import ProbeAction from '@/services/enum/ProbeAction'

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
    
    const selectedProbeAction = ref(undefined as ProbeAction|undefined)

    return { t, selectedProbeAction }
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
    },
    probeActions() : ProbeAction[] {
      const result = [...this.action.probeActions]
      if (this.showLanderMoon) {
        result.unshift(ProbeAction.LANDER_MOON)
      }
      return result
    },
    isLanderMoonSelected() : boolean {
      return this.selectedProbeAction == ProbeAction.LANDER_MOON
    }
  },
  methods: {
    pickProbeAction(probeAction: ProbeAction) : void {
      this.selectedProbeAction = probeAction
      this.$emit('ready', probeAction == ProbeAction.LANDER_MOON ? TechType.PROBE : undefined)
    }
  },
  mounted() {
    if (!this.showLanderMoon) {
      this.$emit('ready')
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
