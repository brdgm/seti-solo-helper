<template>
  <div>
    <AppIcon type="probe-action" name="orbiter-or-lander" class="icon"/>
    <span>:</span>
  </div>
  <template v-for="(planet,index) of task.planets" :key="planet">
    <div v-if="index > 0" class="divider">/</div>
    <div class="planet">
      <AppIcon type="planet" :name="planet" class="planetIcon"/>
      <div class="name">{{t(`planet.${planet}`).substring(0,3)}}</div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskPlanetOrbitLand } from '@/services/Objective'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ObjectiveItemTaskPlanetOrbitLandDisplay',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTaskPlanetOrbitLand>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2rem;
}
.planet {
  display: flex;
  flex-direction: column;
  align-items: center;
  .planetIcon {
    height: 1.25rem;
    object-fit: contain;
  }
  .name {
    font-size: 0.5rem;
    margin-top: -0.1rem;
    text-transform: uppercase;
  }
}
.divider {
  margin-top: -0.5rem;
}
</style>
