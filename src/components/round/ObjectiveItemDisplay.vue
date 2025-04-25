<template>
  <div class="item">
    <label class="tasks" :for="id">
      <template v-for="(task, index) in objectiveItem.tasks" :key="index">
        <div v-if="index > 0"> / </div>
        <ObjectiveItemTaskDisplay :task="task"/>
      </template>
    </label>
    <input type="checkbox" :id="id"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ObjectiveItem } from '@/services/Objective'
import ObjectiveItemTaskDisplay from './ObjectiveItemTaskDisplay.vue'
import { nanoid } from 'nanoid'

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
  },
  computed: {
    id(): string {
      return `check-${nanoid()}`
    }
  }
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.tasks {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
