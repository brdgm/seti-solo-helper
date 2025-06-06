<template>
  <ActionBox :currentCard="currentCard" :instruction-title="t('rules.action.tech.title')">
    <template #resources v-if="action.publicityCost == 6 || action.progress == 1">
      <AppIcon v-if="action.publicityCost == 6" name="publicity-cost-6" class="icon resources"/>
      <AppIcon v-if="action.progress == 1" name="progress-1" class="icon resources"/>
    </template>
    <template #action>
      <div class="action">
        <AppIcon type="action" name="tech" class="icon"/>
        <AppIcon name="rotate-solar-system" class="icon"/>
      </div>
      <div class="action mt-2">
        <AppIcon name="two-point-tile" class="icon resources"/>
        <div class="preferredTechs">
          <AppIcon v-for="index of preferredTechs" :key="index" type="progress" :name="index.toString()" class="icon"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.tech.rotateSolarSystems')"></p>
      <p v-html="t('rules.action.tech.chooseTech')"></p>
      <ol>
        <li v-html="t('rules.action.tech.preferredTechs')"></li>
        <li v-html="t('rules.action.tech.twoPointTile')"></li>
        <li v-html="t('rules.action.tech.getBonus')"></li>
        <li v-html="t('rules.action.tech.discard')"></li>
      </ol>
    </template>
  </ActionBox>

  <div class="action mt-2">
    <span v-html="t('roundTurnBot.pickTech')"></span>
    <button v-for="techType of techTypes" :key="techType" class="btn me-2" @click="pickTech(techType)"
        :class="{'btn-primary': !selectedTechType, 'btn-secondary': selectedTechType == techType, 'btn-outline-secondary': selectedTechType != techType}">
      <AppIcon type="tech" :name="techType" class="icon"/>
    </button>
  </div>
  <div v-if="!selectedTechType" class="alert alert-warning mt-3" v-html="t('roundTurnBot.pleaseSelectTech')"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Card, { CardActionTech } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import TechType from '@/services/enum/TechType'

export default defineComponent({
  name: 'ActionTech',
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

    const selectedTechType = ref(undefined as TechType|undefined)

    return { t, selectedTechType }
  },
  props: {
    action: {
      type: Object as PropType<CardActionTech>,
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
    preferredTechs() : number[] {
      const all = [1,2,3,4,5,6,7,8,9,10,11,12]
      const progress = this.navigationState.botResources.progress
      return [...all.slice(progress-1),...all.slice(0,progress-1)]
    },
    techTypes() : TechType[] {
      // display tech types in order of preference
      const techTypesPerTech = this.preferredTechs.map((index) => {
        if (index >= 1 && index <= 4) {
          return TechType.COMPUTER
        }
        else if (index >= 5 && index <= 8) {
          return TechType.TELESCOPE
        }
        else {
          return TechType.PROBE
        }
      })
      return [...new Set(techTypesPerTech)]
    }
  },
  methods: {
    pickTech(techType: TechType) : void {
      this.selectedTechType = techType
      this.$emit('ready', techType)
    }
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
  &.resources {
    height: 1.5rem;
  }
}
.preferredTechs {
  display: flex;
  flex-wrap: wrap;
  .icon {
    height: 1.5rem;
    margin-left:-0.5rem;
  }
}
</style>
