<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.speciesSpecialAction.extertians.title')">
    <template #action>
      <div class="action">
        <p><b>Exertians:</b> Count the number of rival's played exertian cards and rival's alien traces on this species board. If the total is less than 5, the rival secretly <b>plays a exertian card</b>.</p>
      </div>
    </template>
    <template #instruction>
      Rules Species Special Action...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionSpeciesSpecialAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import TechType from '@/services/enum/TechType'
import ProbeAction from '@/services/enum/ProbeAction'

export default defineComponent({
  name: 'ActionSpeciesSpecialActionExertians',
  inheritAttrs: false,
  components: {
    ActionBox
  },
  emits: {
    ready: (_techType?: TechType) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()

    const selectedProbeAction = ref(undefined as ProbeAction|undefined)

    return { t, selectedProbeAction }
  },
  props: {
    action: {
      type: Object as PropType<CardActionSpeciesSpecialAction>,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  mounted() {
    this.$emit('ready')
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
