<template>
  <div class="sidebar">
    {{t('sideBar.round', {round})}}<template v-if="turn > 0">, {{t('sideBar.turn', {turn})}}</template>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'SideBar',
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
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: fit-content;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 10px 10px 10px 10px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: smaller;
}
</style>
