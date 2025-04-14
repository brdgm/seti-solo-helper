<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.telescope.title')">
    <template #resources v-if="hasTelescopeTech">
      <AppIcon type="tech-discard" name="telescope" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <AppIcon type="action" name="telescope" class="icon"/>
        <AppIcon v-for="scanSector of action.scanSector" :key="scanSector" type="scan-sector" :name="scanSector" class="icon scan"/>
        <AppIcon v-if="hasTelescopeTech" type="scan-sector" name="card" class="icon scan"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.telescope.markSignals')"/>
      <p v-html="t('rules.action.telescope.redrawCards')"/>
      <p v-html="t('rules.action.telescope.multipleSectors.title')"/>
      <ol>
        <li v-html="t('rules.action.telescope.multipleSectors.sectorWin')"/>
        <li v-html="t('rules.action.telescope.multipleSectors.scorePoints')"/>
        <li v-html="t('rules.action.telescope.multipleSectors.mostMarkers')"/>
      </ol>
      <p v-html="t('rules.action.telescope.multipleSectors.tieBreaker')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionTelescope } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionTelescope',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon
  },
  emits: {
    ready: (_techType?: TechType) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardActionTelescope>,
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
  computed: {
    hasTelescopeTech() : boolean {
      return this.navigationState.botResources.techTelescope > 0
    }
  },
  mounted() {
    this.$emit('ready', this.hasTelescopeTech ? TechType.TELESCOPE : undefined)
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
.icon {
  height: 4rem;
  &.scan {
    height: 3rem;
  }
  &.resources {
    height: 1.5rem;
  }
}
</style>
