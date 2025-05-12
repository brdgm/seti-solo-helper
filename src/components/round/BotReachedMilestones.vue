<template>
  <div class="container-fluid mt-3">
    <div class="row" v-for="milestone in milestonesReached" :key="milestone.score">
      <div class="col alert" :class="{'alert-warning': isGold(milestone), 'alert-primary': isNeutral(milestone), 'alert-info': isCentaurians(milestone)}">
        <AppIcon v-if="isNeutral(milestone)" type="action" name="species-discovery" class="icon"/>
        <span v-html="t(`botReachedMilestones.${milestone.type}`, {score:milestone.score})"></span><br/>
        <button class="btn btn-secondary btn-sm mt-2" @click="milestoneTracker.complete(milestone)">{{t('botReachedMilestones.dismiss')}}</button>
        <AppIcon v-if="currentCard" type="decision-direction" :name="currentCard.decisionDirection" class="decisionIcon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import { Milestone } from '@/store/state'
import MilestoneType from '@/services/enum/MilestoneType'
import NavigationState from '@/util/NavigationState'
import Card from '@/services/Card'
import MilestoneTracker from '@/services/MilestoneTracker'
import BotGameBoardResources from '@/services/BotGameBoardResources'

export default defineComponent({
  name: 'BotReachedMilestones',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botGameBoardResources: {
      type: Object as PropType<BotGameBoardResources>,
      required: true
    }
  },
  computed: {
    currentCard() : Card|undefined {
      return this.navigationState.botActions.currentCard
    },
    newVP() : number {
      return this.navigationState.botActionResources.merge(this.navigationState.botResources, this.botGameBoardResources).vp
    },
    milestoneTracker() : MilestoneTracker {
      return this.navigationState.milestoneTracker
    },
    milestonesReached() : Milestone[] {
      return this.milestoneTracker.getReachedMilestones(this.newVP)
    }
  },
  methods: {
    isGold(milestone: Milestone) : boolean {
      return milestone.type == MilestoneType.GOLD
    },
    isNeutral(milestone: Milestone) : boolean {
      return milestone.type == MilestoneType.NEUTRAL
    },
    isCentaurians(milestone: Milestone) : boolean {
      return milestone.type == MilestoneType.CENTAURIANS
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.2rem;
  margin-right: 0.5rem;
}
.decisionIcon {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 25px;
}
</style>
