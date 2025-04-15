<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="resourcesWrapper">
    <div class="resources">
      <p v-html="t('botResources.gainThisTurn')"></p>
      <div class="options">
        <div class="option large">
          <div>
            <AppIcon type="resource" name="credit" class="icon"/><span>/</span>
            <AppIcon type="resource" name="energy" class="icon"/><span>/</span>
            <AppIcon type="resource" name="card" class="icon"/><span>/</span>
            <AppIcon type="resource" name="card-species" class="icon"/>
          </div>
          <NumberInput v-model="botGainResources.gainProgressSingleStep.value"/>
        </div>
        <div class="option">
          <AppIcon name="income-increase" class="icon"/>
          <NumberInput v-model="botGainResources.gainProgressIncomeIncrease.value"/>
        </div>
        <div class="option">
          <AppIcon type="resource" name="publicity" class="icon"/>
          <NumberInput v-model="botGainResources.gainPublicity.value"/>
        </div>
        <div class="option">
          <AppIcon type="resource" name="data" class="icon"/>
          <NumberInput v-model="botGainResources.gainData.value"/>
        </div>
        <div class="option">
          <AppIcon type="resource" name="vp" class="icon"/>
          <NumberInput v-model="botGainResources.gainVP.value"/>
        </div>
        <div class="option small">
          <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#botResourcesLifeTraceModal">
            <AppIcon type="life-trace" name="any" class="icon"/>
          </button>
        </div>
        <div class="option small" v-if="isSpeciesOumuamua">
          <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#botResourcesExofossilModal">
            <AppIcon type="resource" name="exofossil" class="icon"/>
          </button>
        </div>
      </div>
    </div>
  </div>

  <ModalDialog id="botResourcesLifeTraceModal" :title="t('botResources.lifeTrace.title')">
    <template #body>
      <p v-html="t('botResources.lifeTrace.mark')"></p>
      <p v-html="t('botResources.lifeTrace.tiebreaker')"></p>
      <template v-if="isSpeciesOumuamua">
        <p>
          <span class="fw-bold" v-html="t('alienSpecies.oumuamua')"></span>:
          <span v-html="t('botResources.lifeTrace.oumuamua')"></span>
        </p>
      </template>
    </template>
  </ModalDialog>

  <ModalDialog id="botResourcesExofossilModal" :title="t('botResources.exofossil.title')">
    <template #body>
      <p v-html="t('botResources.exofossil.collect')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import BotGainResources from '@/services/BotGainResources'
import { useStateStore } from '@/store/state'
import AlienSpecies from '@/services/enum/AlienSpecies'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'BotResources',
  components: {
    AppIcon,
    NumberInput,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    botGainResources: {
      type: BotGainResources,
      required: true
    }
  },
  computed: {
    isSpeciesOumuamua() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.OUMUAMUA)
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
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    .option {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      width: 6rem;
      &.large {
        width: 12.5rem;
      }
      &.small {
        width: 3.5rem;
      }
      > * {
        flex-grow: 1;
      }
    }
  }
}
</style>
