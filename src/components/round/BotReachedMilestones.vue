<template>
  <div class="container-fluid mt-3">
    <div class="row" v-for="milestone in milestonesReached" :key="milestone.score">
      <div class="col alert" :class="{'alert-warning': isGold(milestone), 'alert-primary': isNeutral(milestone)}">
        <AppIcon v-if="isNeutral(milestone)" type="action" name="species-discovery" class="icon"/>
        <span v-html="t(`botReachedMilestones.${milestone.milestoneType}`, {score:milestone.score})"></span>
        <AppIcon v-if="currentCard" type="decision-direction" :name="currentCard.decisionDirection" class="decisionIcon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import BotGainResources from '@/services/BotGainResources'
import { BotResources } from '@/store/state'
import getReachedMilestones, { Milestone } from '@/util/getReachedMilestones'
import MilestoneType from '@/services/enum/MilestoneType'
import Card from '@/services/Card'

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
    botResources: {
      type: Object as PropType<BotResources>,
      required: true
    },
    botGainResources: {
      type: BotGainResources,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: false
    }
  },
  computed: {
    previousVP() : number {
      return this.botResources.vp
    },
    newVP() {
      return this.botGainResources.merge(this.botResources).vp
    },
    milestonesReached() : Milestone[] {
      return getReachedMilestones(this.previousVP, this.newVP)
    }
  },
  methods: {
    isGold(milestone: Milestone) : boolean {
      return milestone.milestoneType == MilestoneType.GOLD
    },
    isNeutral(milestone: Milestone) : boolean {
      return milestone.milestoneType == MilestoneType.NEUTRAL
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
