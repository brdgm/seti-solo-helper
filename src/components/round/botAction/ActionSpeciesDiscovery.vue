<template>
  <ActionBox :instruction-title="'Species Discovery...'">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="species-discovery" class="icon"/>
        <div class="fst-italic">
          If the #{{action.alienSpeciesIndex}} alien species is discoverd, replace this card with the corresponding alien card and resolve it.
        </div>
      </div>
    </template>
    <template #instruction>
      Rules Species Discovery...
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionSpeciesDiscovery } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionSpeciesDiscovery',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardActionSpeciesDiscovery>,
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
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 4rem;
}
</style>
