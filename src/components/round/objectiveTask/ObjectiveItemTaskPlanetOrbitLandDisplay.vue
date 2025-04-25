<template>
  <div>
    <AppIcon type="probe-action" name="orbiter-or-lander" class="icon"/>
    <span>:</span>
  </div>
  <template v-for="(planet,index) of task.planets" :key="planet">
    <template v-if="index > 0">/</template>    
    <AppIcon type="planet" :name="planet" class="icon"/>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskPlanetOrbitLand } from '@/services/Objective'

export default defineComponent({
  name: 'ObjectiveItemTaskPlanetOrbitLandDisplay',
  components: {
    AppIcon
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
  height: 1.5rem;
}
</style>
