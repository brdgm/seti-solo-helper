<template>
  <div class="actionBox col" @click="showInstructions">
    <slot name="action"></slot>
    <div class="resources" v-if="$slots.resources">
      <slot name="resources"></slot>
    </div>
    <AppIcon type="decision-direction" :name="currentCard.decisionDirection" class="decisionIcon"/>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <slot name="instruction"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import AppIcon from '../structure/AppIcon.vue'
import Card from '@/services/Card'
import AlienSpecies from '@/services/enum/AlienSpecies'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const modalId = `modal-${crypto.randomUUID()}`
    return { modalId }
  },
  props: {
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    },
    instructionTitle: {
      type: String,
      required: true
    },
    modalSizeLg: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    backgroundColor() : string {
      switch (this.currentCard.alienSpecies) {
        case AlienSpecies.MASCAMITES:
          return '#d7c881'
        case AlienSpecies.ANOMALIES:
          return '#93d2d3'
        case AlienSpecies.OUMUAMUA:
          return '#b3a8c8'
        case AlienSpecies.CENTAURIANS:
          return '#8bbfa9'
        case AlienSpecies.EXERTIANS:
          return '#e7b49f'
        default:
          return '#c3cce8'
      }
    },
    borderColor() : string {
      switch (this.currentCard.alienSpecies) {
        case AlienSpecies.MASCAMITES:
          return '#a28917'
        case AlienSpecies.ANOMALIES:
          return '#004a65'
        case AlienSpecies.OUMUAMUA:
          return '#333469'
        case AlienSpecies.CENTAURIANS:
          return '#014d3e'
        case AlienSpecies.EXERTIANS:
          return '#bc0406'
        default:
          return '#9ca1af'
      }
    }
  },
  methods: {
    showInstructions() {
      showModal(this.modalId)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  position: relative;
  background-color: v-bind(backgroundColor);
  border: 2px solid v-bind(borderColor);
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  background-image: url('@/assets/icons/help-semi-transparent.webp');
  background-repeat: no-repeat;
  background-position: right 5px top 5px;
  background-size: 1.25rem;
}
.decisionIcon {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 25px;
}
.resources {
  position: absolute;
  left: 5px;
  bottom: 5px;
  display: flex;
  gap: 0.25rem;
}
</style>
