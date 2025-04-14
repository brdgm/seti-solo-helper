<template>
  <div class="resourcesWrapper">
    <div class="resources">
      <p>Resources <b>the rival</b> gained this turn:</p>
      <table>
        <tbody>
          <tr>
            <td colspan="3">
              <AppIcon type="resource" name="credit" class="icon"/><span>/</span>
              <AppIcon type="resource" name="energy" class="icon"/><span>/</span>
              <AppIcon type="resource" name="card" class="icon"/><span>/</span>
              <AppIcon type="resource" name="card-species" class="icon"/>
            </td>
            <td>
              <ScoringTextInput v-model="progressSingleSteps"/>
            </td>
            <td>
              <AppIcon name="income-increase" class="icon"/>
            </td>
            <td>
              <ScoringTextInput v-model="incomeIncreaseSteps"/>
            </td>
          </tr>
          <tr>
            <td>
              <AppIcon type="resource" name="publicity" class="icon"/>
            </td>
            <td>
              <ScoringTextInput v-model="publicity"/>
            </td>
            <td>
              <AppIcon type="resource" name="data" class="icon"/>
            </td>
            <td>
              <ScoringTextInput v-model="data"/>
            </td>
            <td>
              <AppIcon type="resource" name="vp" class="icon"/>
            </td>
            <td>
              <ScoringTextInput v-model="vp"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotResources, useStateStore } from '@/store/state'
import AppIcon from '../structure/AppIcon.vue'
import ScoringTextInput from '@brdgm/brdgm-commons/src/components/form/ScoringTextInput.vue'

export default defineComponent({
  name: 'BotResources',
  components: {
    AppIcon,
    ScoringTextInput
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const progressSingleSteps = ref(0)
    const incomeIncreaseSteps = ref(0)
    const publicity = ref(0)
    const data = ref(0)
    const vp = ref(0)

    return { t, state, progressSingleSteps, incomeIncreaseSteps, publicity, data, vp }
  },
  computed: {
    resources() : BotResources {
      return {
        progress: this.progressSingleSteps + this.incomeIncreaseSteps * 4,
        publicity: this.publicity,
        data: this.data,
        techProbe: 0,
        techTelescope: 0,
        techComputer: 0,
        vp: this.vp
      }
    },
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.resourcesWrapper {
  margin-top: 15px;
  max-width: 38rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
.resources {
  background-color: #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  .icon {
    height: 1.5rem;
    width: 1.7rem;
    object-fit: contain;
  }
  input {
    width: 3rem;
    margin-left: 0.25rem;
    margin-right: 1rem;
  }
}
</style>
