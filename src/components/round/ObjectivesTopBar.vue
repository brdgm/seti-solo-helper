<template>
  <div class="objectives mb-2">
    <div class="objective" v-for="objective in objectiveStack.current" :key="objective.id">
      <AppIcon type="objective-level" :name="`${objective.level}`" class="levelIcon"/>
      <div v-for="(item,index) of objective.items" :key="index">
        <ObjectiveItemDisplay :objectiveItem="item" />
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
import ObjectiveItemDisplay from './ObjectiveItemDisplay.vue'

export default defineComponent({
  name: 'ObjectivesTopBar',
  components: {
    AppIcon,
    ObjectiveItemDisplay
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
  gap: 5px;
}
.objective {
  display: flex;
  position: relative;
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
</style>
