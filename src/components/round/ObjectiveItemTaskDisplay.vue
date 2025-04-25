<template>
  <template v-if="isAction">
    <ObjectiveItemTaskActionDisplay :task="(task as ObjectiveItemTaskAction)"/>
  </template>
  <template v-else-if="isCountable">
    <ObjectiveItemTaskCountableDisplay :task="(task as ObjectiveItemTaskCountable)"/>
  </template>
  <template v-else-if="isSectorWin">
    <ObjectiveItemTaskSectorWinDisplay :task="(task as ObjectiveItemTaskSectorWin)"/>
  </template>
  <template v-else-if="isPlanetOrbitLand">
    <ObjectiveItemTaskPlanetOrbitLandDisplay :task="(task as ObjectiveItemTaskPlanetOrbitLand)"/>
  </template>
  <template v-else-if="isTechType">
    <ObjectiveItemTaskTechTypeDisplay :task="(task as ObjectiveItemTaskTechType)"/>
  </template>
  <template v-else-if="isLifeTrace">
    <ObjectiveItemTaskLifeTraceDisplay :task="(task as ObjectiveItemTaskLifeTrace)"/>
  </template>
  <template v-else>
    {{task.task}}
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  ObjectiveItemTask,
  ObjectiveItemTaskAction,  // eslint-disable-line @typescript-eslint/no-unused-vars
  ObjectiveItemTaskCountable,  // eslint-disable-line @typescript-eslint/no-unused-vars
  ObjectiveItemTaskLifeTrace,  // eslint-disable-line @typescript-eslint/no-unused-vars
  ObjectiveItemTaskPlanetOrbitLand,  // eslint-disable-line @typescript-eslint/no-unused-vars
  ObjectiveItemTaskSectorWin,  // eslint-disable-line @typescript-eslint/no-unused-vars
  ObjectiveItemTaskTechType  // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@/services/Objective'
import ObjectiveTask from '@/services/enum/ObjectiveTask'
import ObjectiveItemTaskActionDisplay from './objectiveTask/ObjectiveItemTaskActionDisplay.vue'
import ObjectiveItemTaskCountableDisplay from './objectiveTask/ObjectiveItemTaskCountableDisplay.vue'
import ObjectiveItemTaskSectorWinDisplay from './objectiveTask/ObjectiveItemTaskSectorWinDisplay.vue'
import ObjectiveItemTaskPlanetOrbitLandDisplay from './objectiveTask/ObjectiveItemTaskPlanetOrbitLandDisplay.vue'
import ObjectiveItemTaskTechTypeDisplay from './objectiveTask/ObjectiveItemTaskTechTypeDisplay.vue'
import ObjectiveItemTaskLifeTraceDisplay from './objectiveTask/ObjectiveItemTaskLifeTraceDisplay.vue'

export default defineComponent({
  name: 'ObjectiveItemTaskDisplay',
  components: {
    ObjectiveItemTaskActionDisplay,
    ObjectiveItemTaskCountableDisplay,
    ObjectiveItemTaskSectorWinDisplay,
    ObjectiveItemTaskPlanetOrbitLandDisplay,
    ObjectiveItemTaskTechTypeDisplay,
    ObjectiveItemTaskLifeTraceDisplay
  },
  props: {
    task: {
      type: Object as PropType<ObjectiveItemTask>,
      required: true
    }
  },
  computed: {
    isAction() : boolean {
      return [
        ObjectiveTask.ACTION_PROBE_LAND,
        ObjectiveTask.ACTION_PROBE_ORBIT,
        ObjectiveTask.ACTION_LAUNCH,
        ObjectiveTask.ACTION_TELESCOPE,
        ObjectiveTask.PROBE_VISIT_ASTEROIDS,
        ObjectiveTask.PROBE_VISIT_COMET,
        ObjectiveTask.MISSION_COMPLETE,
        ObjectiveTask.CARD_PLAY_3_CREDITS
      ].includes(this.task.task)
    },
    isCountable() : boolean {
      return [
        ObjectiveTask.PUBLICITY,
        ObjectiveTask.VICTORY_POINTS,
        ObjectiveTask.DATA_TOKENS
      ].includes(this.task.task)
    },
    isSectorWin() : boolean {
      return this.task.task == ObjectiveTask.SECTOR_WIN
    },
    isPlanetOrbitLand() : boolean {
      return this.task.task == ObjectiveTask.PLANET_ORBIT_LAND
    },
    isTechType() : boolean {
      return this.task.task == ObjectiveTask.TECH_TYPE
    },
    isLifeTrace() : boolean {
      return this.task.task == ObjectiveTask.LIFE_TRACE
    },
  }
})
</script>

<style lang="scss" scoped>
</style>
