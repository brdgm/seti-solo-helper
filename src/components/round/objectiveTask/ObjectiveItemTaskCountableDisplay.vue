<template>
  <AppIcon type="objective-task" :name="`${task.task}-${task.count}`" class="icon"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskCountable } from '@/services/Objective'

export default defineComponent({
  name: 'ObjectiveItemTaskCountableDisplay',
  components: {
    AppIcon
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTaskCountable>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.6rem;
  margin: 0.2rem;
}
</style>
