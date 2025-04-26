<template>
  <AppIcon type="tech" :name="`${task.techType}`" class="icon"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskTechType } from '@/services/Objective'

export default defineComponent({
  name: 'ObjectiveItemTaskTechTypeDisplay',
  components: {
    AppIcon
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTaskTechType>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2rem;
}
</style>
