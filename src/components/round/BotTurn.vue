<template>
  <BotAction :action="currentAction" :currentCard="currentCard" :navigationState="navigationState"/>

  <BotResources/>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()" data-testid="nextButton">
    {{t('roundTurnBot.executed')}}
  </button>

  <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()" v-if="hasMoreActions">
    {{t('roundTurnBot.notPossible')}}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import { useStateStore } from '@/store/state'
import Card from '@/services/Card'
import BotAction from './BotAction.vue'
import BotResources from './BotResources.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    BotAction,
    BotResources
  },
  emits: ['executed', 'notPossible'],
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()

    const { action } = props.navigationState
    const currentAction = props.currentCard.actions[action]

    return { t, state, currentAction }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  computed: {
    hasMoreActions() : boolean {
      return this.navigationState.action < this.currentCard.actions.length - 1
    }
  },
  methods: {
    executed() : void {
      this.$emit('executed')
    },
    notPossible() : void {
      this.$emit('notPossible')
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
