<template>
  <div class="objectives" v-if="hasObjectives && hasAnyObjectiveTiles">
    <div class="objective" v-for="(objective,objectiveIndex) in objectiveStack.current" :key="objective.id">
      <AppIcon type="objective-level" :name="`${objective.level}`" class="levelIcon"/>
      <div v-for="(item,itemIndex) of objective.items" :key="itemIndex">
        <div class="item">
          <label class="tasks" :for="`check-${objectiveIndex}-${itemIndex}`">
            <template v-for="(task, index) in item.tasks" :key="index">
              <div v-if="index > 0">/</div>
              <ObjectiveItemTaskDisplay :task="task"/>
            </template>
          </label>
          <input v-if="!readOnly" type="checkbox" :id="`check-${objectiveIndex}-${itemIndex}`" v-model="objectiveStack.currentItemCheck[objectiveIndex][itemIndex]"/>
        </div>
      </div>
    </div>
    <div class="objectiveCount">
      <div class="count" v-if="objectiveStack.pile.length > 0">
        <AppIcon name="objective" class="tileIcon"/>
        <div>: {{objectiveStack.pile.length}}</div>
      </div>
      <div class="count" v-if="objectiveStack.complete.length > 0">
        <AppIcon name="objective-completed" class="tileIcon"/>
        <div>: {{objectiveStack.complete.length}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import ObjectiveStack from '@/services/ObjectiveStack'
import ObjectiveItemTaskDisplay from './ObjectiveItemTaskDisplay.vue'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'ObjectivesTopBar',
  components: {
    AppIcon,
    ObjectiveItemTaskDisplay
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    hasObjectives() : boolean {
      return this.state.setup.difficultyLevel != DifficultyLevel.LEVEL_1
    },
    objectiveStack() : ObjectiveStack {
      return this.navigationState.objectiveStack
    },
    hasAnyObjectiveTiles() : boolean {
      const { pile, current, complete } = this.objectiveStack
      return pile.length > 0 || current.length > 0 || complete.length > 0
    }
  }
})
</script>

<style lang="scss" scoped>
.objectives {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
  width: fit-content;
  @media (min-width: 820px) {
    float: right;
    flex-direction: column;
    margin-left: 15px;
    & > * {
      width: 100%
    }
  }
}
.objective {
  display: flex;
  position: relative;
  gap: 10px;
  background-color: #c0def5;
  border-radius: 5px;
  min-width: 50px;
  min-height: 50px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  justify-content: center;
  .levelIcon {
    border-top-left-radius: 5px;
    width: 1.5rem;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  label {
    cursor: pointer;
  }
}
.tasks {
  display: flex;
  gap: 1px;
  align-items: center;
}
.objectiveCount {
  display: flex;
  align-items: center;
  margin-left: 5px;
  gap: 5px;
  font-size: small;
  @media (min-width: 820px) {
    margin-left: 0;
  }
  .count {
    display: flex;
    align-items: center;
    gap: 1px;
  }
  .tileIcon {
    height: 1.5rem;
  }
}
</style>
