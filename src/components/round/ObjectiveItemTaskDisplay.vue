<template>
  <template v-if="toAction">
    <ObjectiveItemTaskActionDisplay :task="toAction"/>
  </template>
  <template v-else-if="toCountable">
    <ObjectiveItemTaskCountableDisplay :task="toCountable"/>
  </template>
  <template v-else-if="toSectorWin">
    <ObjectiveItemTaskSectorWinDisplay :task="toSectorWin"/>
  </template>
  <template v-else-if="toPlanetOrbitLand">
    <ObjectiveItemTaskPlanetOrbitLandDisplay :task="toPlanetOrbitLand"/>
  </template>
  <template v-else-if="toTechType">
    <ObjectiveItemTaskTechTypeDisplay :task="toTechType"/>
  </template>
  <template v-else-if="toLifeTrace">
    <ObjectiveItemTaskLifeTraceDisplay :task="toLifeTrace"/>
  </template>
  <template v-else>
    {{task.task}}
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  ObjectiveItemTask,
  ObjectiveItemTaskAction,
  ObjectiveItemTaskCountable,
  ObjectiveItemTaskLifeTrace,
  ObjectiveItemTaskPlanetOrbitLand,
  ObjectiveItemTaskSectorWin,
  ObjectiveItemTaskTechType
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
    toAction() : ObjectiveItemTaskAction|undefined {
      if ([
        ObjectiveTask.ACTION_PROBE_LAND,
        ObjectiveTask.ACTION_PROBE_ORBIT,
        ObjectiveTask.ACTION_LAUNCH,
        ObjectiveTask.ACTION_TELESCOPE,
        ObjectiveTask.PROBE_VISIT_ASTEROIDS,
        ObjectiveTask.PROBE_VISIT_COMET,
        ObjectiveTask.MISSION_COMPLETE,
        ObjectiveTask.CARD_PLAY_3_CREDITS,
        ObjectiveTask.INCOME
      ].includes(this.task.task)) {
        return this.task as ObjectiveItemTaskAction
      }
      else {
        return undefined
      }
    },
    toCountable() : ObjectiveItemTaskCountable|undefined {
      if ([
        ObjectiveTask.PUBLICITY,
        ObjectiveTask.VICTORY_POINTS,
        ObjectiveTask.DATA_TOKENS
      ].includes(this.task.task)) {
        return this.task as ObjectiveItemTaskCountable
      }
      else {
        return undefined
      }
    },
    toSectorWin() : ObjectiveItemTaskSectorWin|undefined {
      if (this.task.task == ObjectiveTask.SECTOR_WIN) {
        return this.task as ObjectiveItemTaskSectorWin
      }
      else {
        return undefined
      }
    },
    toPlanetOrbitLand() : ObjectiveItemTaskPlanetOrbitLand|undefined {
      if (this.task.task == ObjectiveTask.PLANET_ORBIT_LAND) {
        return this.task as ObjectiveItemTaskPlanetOrbitLand
      }
      else {
        return undefined
      }
    },
    toTechType() : ObjectiveItemTaskTechType|undefined {
      if (this.task.task == ObjectiveTask.TECH_TYPE) {
        return this.task as ObjectiveItemTaskTechType
      }
      else {
        return undefined
      }
    },
    toLifeTrace() : ObjectiveItemTaskLifeTrace|undefined {
      if (this.task.task == ObjectiveTask.LIFE_TRACE) {
        return this.task as ObjectiveItemTaskLifeTrace
      }
      else {
        return undefined
      }
    },
  }
})
</script>
