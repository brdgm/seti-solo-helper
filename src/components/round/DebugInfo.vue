<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <template v-if="cardDeck.currentCard"><b>card</b>: {{cardDeck.currentCard}}<br/></template>
      <b>deck</b>: {{cardDeck.toPersistence()}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck ?? CardDeck.new(this.navigationState.round)
    } 
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
