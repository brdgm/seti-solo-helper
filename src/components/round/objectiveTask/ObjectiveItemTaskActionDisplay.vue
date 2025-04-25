<template>
  <AppIcon :type="iconType" :name="iconName" class="icon"/>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { ObjectiveItemTaskAction } from '@/services/Objective'
import ObjectiveTask from '@/services/enum/ObjectiveTask'
import ProbeAction from '@/services/enum/ProbeAction'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'ObjectiveItemTaskActionDisplay',
  components: {
    AppIcon
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTaskAction>,
      required: true
    }
  },
  computed: {
    iconType() : string {
      switch (this.task.task) {
        case ObjectiveTask.ACTION_PROBE_LAND:
        case ObjectiveTask.ACTION_PROBE_ORBIT:
          return 'probe-action'
        case ObjectiveTask.ACTION_LAUNCH:
        case ObjectiveTask.ACTION_TELESCOPE:
          return 'action'
        default:
          return 'objective-task'
      }
    },
    iconName() : string {
      switch (this.task.task) {
        case ObjectiveTask.ACTION_PROBE_LAND:
          return ProbeAction.LANDER
        case ObjectiveTask.ACTION_PROBE_ORBIT:
          return ProbeAction.ORBITER
        case ObjectiveTask.ACTION_LAUNCH:
          return Action.LAUNCH
        case ObjectiveTask.ACTION_TELESCOPE:
          return Action.TELESCOPE
        default:
          return this.task.task
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2rem;
}
</style>
