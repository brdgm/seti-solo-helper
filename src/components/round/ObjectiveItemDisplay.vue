<template>
  <div class="item">
    <template v-for="(task, index) in objectiveItem.tasks" :key="index">
      <div v-if="index > 0"> / </div>
      <ObjectiveItemTaskDisplay :task="task"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ObjectiveItem } from '@/services/Objective'
import ObjectiveItemTaskDisplay from './ObjectiveItemTaskDisplay.vue'

export default defineComponent({
  name: 'ObjectiveItemDisplay',
  components: {
    ObjectiveItemTaskDisplay
  },
  props: {
    objectiveItem: {
      type: Object as PropType<ObjectiveItem>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
