<template>
  <div class="resourcesWrapper">
    <div class="resources">
      <p>Resources <b>the rival</b> gained this turn:</p>
      <div class="grid">
        <div class="grid-item span-3">
          <AppIcon type="resource" name="credit" class="icon"/><span>/</span>
          <AppIcon type="resource" name="energy" class="icon"/><span>/</span>
          <AppIcon type="resource" name="card" class="icon"/><span>/</span>
          <AppIcon type="resource" name="card-species" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="progressSingleSteps"/>
        </div>
        <div class="grid-item">
          <AppIcon name="income-increase" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="incomeIncreaseSteps"/>
        </div>
        <div class="grid-item">
          <AppIcon type="resource" name="publicity" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="publicity"/>
        </div>
        <div class="grid-item">
          <AppIcon type="resource" name="data" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="data"/>
        </div>
        <div class="grid-item">
          <AppIcon type="resource" name="vp" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="vp"/>
        </div>
      </div>
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
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1.9em 4rem);
    gap: 0.25rem;
    align-items: center;
    @media (max-width: 500px) {
      grid-template-columns: repeat(2, 1.9em 4rem);
    }
    @media (max-width: 360px) {
      grid-template-columns: repeat(1, 4.3em 4rem);
    }
  }
  .grid-item {
    &.span-3 {
      grid-column: span 3;
      @media (max-width: 360px) {
        grid-column: span 1;
      }
    }  
  }
}
</style>
