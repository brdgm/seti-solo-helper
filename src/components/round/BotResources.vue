<template>
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
          <NumberInput v-model="resources.progressSingleStep"/>
        </div>
        <div class="option">
          <AppIcon name="income-increase" class="icon"/>
          <NumberInput v-model="resources.progressIncomeIncrease"/>
        </div>
        <div class="option">
          <AppIcon type="resource" name="publicity" class="icon"/>
          <NumberInput v-model="resources.publicity"/>
        </div>
        <div class="option">
          <AppIcon type="resource" name="data" class="icon"/>
          <NumberInput v-model="resources.data" :min="-3"/>
        </div>
        <div class="option">
          <AppIcon type="resource" name="vp" class="icon"/>
          <NumberInput v-model="resources.vp"/>
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
      <p>
        <AppIcon type="life-trace" name="any" class="icon float-start"/>
        <span v-html="t('botResources.lifeTrace.any')"></span>
      </p>
      <p v-html="t('botResources.lifeTrace.tiebreaker')"></p>
      <template v-if="isSpeciesOumuamua">
        <p class="alert alert-info small">
          <span class="fw-bold" v-html="t('alienSpecies.oumuamua')"></span>:
          <span v-html="t('botResources.lifeTrace.oumuamua')"></span>
        </p>
      </template>
      <template v-if="isSpeciesCentaurians">
        <p class="alert alert-info small">
          <span class="fw-bold" v-html="t('alienSpecies.centaurians')"></span>:
          <span v-html="t('botResources.lifeTrace.centaurians')"></span>
        </p>
      </template>
      <template v-if="isSpeciesArkhos">
        <p class="alert alert-info small">
          <span class="fw-bold" v-html="t('alienSpecies.arkhos')"></span>:
          <span v-html="t('botResources.lifeTrace.arkhos')"></span>
        </p>
      </template>
      <template v-if="isSpeciesGlyphids">
        <p class="alert alert-info small">
          <span class="fw-bold" v-html="t('alienSpecies.glyphids')"></span>:
          <span v-html="t('botResources.lifeTrace.glyphids')"></span>
        </p>
      </template>
      <template v-if="isSpeciesAmoeba">
        <p class="alert alert-info small">
          <span class="fw-bold" v-html="t('alienSpecies.amoeba')"></span>:
          <span v-html="t('botResources.lifeTrace.amoeba')"></span>
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
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import { useStateStore } from '@/store/state'
import AlienSpecies from '@/services/enum/AlienSpecies'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import BotGameBoardResources from '@/services/BotGameBoardResources'
import { cloneDeep } from 'lodash'

export default defineComponent({
  name: 'BotResources',
  emits: ['update:modelValue'],  
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
    modelValue: {
      type: Object as PropType<BotGameBoardResources>,
      required: true
    }
  },
  data() {
    return {
      resources: cloneDeep(this.modelValue)
    }
  },
  watch: {
    resources: {
      handler(newValue: BotGameBoardResources) {
        this.$emit('update:modelValue', newValue)
      },
      deep: true
    }
  },
  computed: {
    isSpeciesOumuamua() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.OUMUAMUA)
    },
    isSpeciesCentaurians() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.CENTAURIANS)
    },
    isSpeciesArkhos() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.ARKHOS)
    },
    isSpeciesGlyphids() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.GLYPHIDS)
    },
    isSpeciesAmoeba() : boolean {
      return this.state.alienDiscovery.species.includes(AlienSpecies.AMOEBA)
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
.modal .icon {
  height: 1.5rem;
  margin-right: 0.5rem;
}
</style>
