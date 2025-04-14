<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>card</b>: {{cardDeck.currentCard ?? '-'}}<br/>
      <b>deck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>resources</b>: {{resources}}<br/>
      <b>gain resources</b>: {{gainResources}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources, useStateStore } from '@/store/state'
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
      return this.navigationState.cardDeck
    },
    resources() : BotResources {
      return this.navigationState.botResources
    },
    gainResources() : BotResources {
      return this.navigationState.botGainResources.resources
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
