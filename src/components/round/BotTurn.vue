<template>
  <BotAction :action="currentAction" :currentCard="currentCard" :navigationState="navigationState"/>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()">
    {{t('roundTurnBot.executed')}}
  </button>

  <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
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

export default defineComponent({
  name: 'BotTurn',
  components: {
    BotAction
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
