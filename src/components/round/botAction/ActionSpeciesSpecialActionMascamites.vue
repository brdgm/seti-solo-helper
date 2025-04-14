<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.speciesSpecialAction.mascamites.title')">
    <template #resources v-if="isLanderMoonSelected">
      <AppIcon type="tech-discard" name="probe" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <AppIcon name="movement-points-4" class="icon"/>
        <div class="planet">
          <AppIcon type="planet" name="saturn" class="icon"/>
          <div class="name">{{t(`planet.saturn`)}}</div>
        </div>
        <AppIcon name="probe-next" class="icon"/>
        <AppIcon name="movement-points-5" class="icon"/>
        <div class="planet">
          <AppIcon type="planet" name="jupiter" class="icon"/>
          <div class="name">{{t(`planet.jupiter`)}}</div>
        </div>
      </div>
      <div class="action mt-3" v-if="!showLanderMoon">
        <template v-for="(probeAction,index) in probeActions" :key="probeAction">
          <AppIcon v-if="index > 0" name="probe-next" class="icon"/>
          <AppIcon type="probe-action" :name="probeAction" class="icon"/>
        </template>
      </div>
      <div class="action">
        <p><b>Mascamites</b>: Take a random <b>sample token</b> from the planet and place it face up in the next dedicated space on this alien species board.</p>
      </div>
    </template>
    <template #instruction>
      Rules Species Special Action...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionSpeciesSpecialAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import TechType from '@/services/enum/TechType'
import AppIcon from '@/components/structure/AppIcon.vue'
import ProbeAction from '@/services/enum/ProbeAction'

export default defineComponent({
  name: 'ActionSpeciesSpecialActionMascamites',
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
      type: Object as PropType<CardActionSpeciesSpecialAction>,
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
      return this.hasProbeTech
    },
    hasProbeTech() : boolean {
      return this.navigationState.botResources.techProbe > 0
    },
    probeActions() : ProbeAction[] {
      const result = [ProbeAction.LANDER]
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
