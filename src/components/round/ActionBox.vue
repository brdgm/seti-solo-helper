<template>
  <div class="actionBox col" @click="showInstructions">
    <slot name="action"></slot>
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
  background-color: #c3cce8;
  border: 2px solid #9ca1af;
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
</style>
