<template>
  <div class="objectives mb-2">
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
          <input type="checkbox" :id="`check-${objectiveIndex}-${itemIndex}`"/>
        </div>
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

export default defineComponent({
  name: 'ObjectivesTopBar',
  components: {
    AppIcon,
    ObjectiveItemTaskDisplay
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    objectiveStack() : ObjectiveStack {
      return this.navigationState.objectiveStack
    }
  }
})
</script>

<style lang="scss" scoped>
.objectives {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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
</style>
