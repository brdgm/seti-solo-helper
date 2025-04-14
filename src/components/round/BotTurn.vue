<template>
  <BotAction :action="currentAction" :currentCard="currentCard" :navigationState="navigationState"
      @ready="ready"/>

  <BotResources v-if="showBotResources" :botGainResources="navigationState.botGainResources"/>
  <BotReachedMilestones :botResources="navigationState.botResources" :botGainResources="navigationState.botGainResources" :currentCard="currentCard"/>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()" v-if="actionReady">
    {{t('roundTurnBot.executed')}}
  </button>

  <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()" v-if="hasMoreActions">
    {{t('roundTurnBot.notPossible')}}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import { useStateStore } from '@/store/state'
import Card, { CardAction } from '@/services/Card'
import BotAction from './BotAction.vue'
import BotResources from './BotResources.vue'
import BotActions from '@/services/BotActions'
import TechType from '@/services/enum/TechType'
import Action from '@/services/enum/Action'
import BotReachedMilestones from './BotReachedMilestones.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    BotAction,
    BotResources,
    BotReachedMilestones
  },
  emits: {
    executed: (_action?: CardAction, _techType?: TechType) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
    notPossible: () => true
  },
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    const { action } = props.navigationState
    const currentAction = props.botActions.actions[action]

    const actionReady = ref(false)
    const actionTechType = ref(undefined as TechType|undefined)

    return { t, state, currentAction, actionReady, actionTechType }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  computed: {
    hasMoreActions() : boolean {
      return this.navigationState.action < this.botActions.actions.length - 1
    },
    showBotResources() : boolean {
      return [Action.TECH, Action.PROBE, Action.TELESCOPE, Action.ANALYZE, Action.SPECIES_SPECIAL_ACTION].includes(this.currentAction.action)
    }
  },
  methods: {
    executed() : void {
      this.$emit('executed', this.currentAction, this.actionTechType)
    },
    notPossible() : void {
      this.$emit('notPossible')
    },
    ready(techType?: TechType) : void {
      this.actionReady = true
      this.actionTechType = techType
      this.navigationState.botGainResources.applyAction(this.currentAction, techType, this.currentCard.alienSpecies)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 2rem;
  margin: 10px;
}
</style>
