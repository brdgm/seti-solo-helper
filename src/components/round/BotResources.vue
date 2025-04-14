<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="resourcesWrapper">
    <div class="resources">
      <p v-html="t('botResources.gainThisTurn')"></p>
      <div class="grid">
        <div class="grid-item span-3">
          <AppIcon type="resource" name="credit" class="icon"/><span>/</span>
          <AppIcon type="resource" name="energy" class="icon"/><span>/</span>
          <AppIcon type="resource" name="card" class="icon"/><span>/</span>
          <AppIcon type="resource" name="card-species" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="botGainResources.gainProgressSingleStep.value"/>
        </div>
        <div class="grid-item">
          <AppIcon name="income-increase" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="botGainResources.gainProgressIncomeIncrease.value"/>
        </div>
        <div class="grid-item">
          <AppIcon type="resource" name="publicity" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="botGainResources.gainPublicity.value"/>
        </div>
        <div class="grid-item">
          <AppIcon type="resource" name="data" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="botGainResources.gainData.value"/>
        </div>
        <div class="grid-item">
          <AppIcon type="resource" name="vp" class="icon"/>
        </div>
        <div class="grid-item">
          <ScoringTextInput v-model="botGainResources.gainVP.value"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import ScoringTextInput from '@brdgm/brdgm-commons/src/components/form/ScoringTextInput.vue'
import BotGainResources from '@/services/BotGainResources'

export default defineComponent({
  name: 'BotResources',
  components: {
    AppIcon,
    ScoringTextInput
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botGainResources: {
      type: BotGainResources,
      required: true
    }
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
