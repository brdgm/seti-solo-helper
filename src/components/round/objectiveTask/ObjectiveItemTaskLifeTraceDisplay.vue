<template>
  <AppIcon type="life-trace" :name="`${task.lifeTrace}`" class="icon"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskLifeTrace } from '@/services/Objective'

export default defineComponent({
  name: 'ObjectiveItemTaskLifeTraceDisplay',
  components: {
    AppIcon
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTaskLifeTrace>,
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
