<template>
  <AppIcon type="sector-win" :name="`${task.sectorWin}`" class="icon"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskSectorWin } from '@/services/Objective'

export default defineComponent({
  name: 'ObjectiveItemTaskSectorWinDisplay',
  components: {
    AppIcon
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTaskSectorWin>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
}
</style>
