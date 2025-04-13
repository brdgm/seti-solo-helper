<template>
  <div class="actionBox col" @click="showInstructions">
    <slot name="action"></slot>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <slot name="instruction"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog
  },
  setup() {
    const modalId = `modal-${crypto.randomUUID()}`
    return { modalId }
  },
  props: {
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
</style>
