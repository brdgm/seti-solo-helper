<template>
  <h3 class="mt-4 mb-3">{{t('setupGameBoard.goldScoringTile.title')}}</h3>

  <div>
    <div class="tiles">
      <AppIcon v-for="tile in tiles" :key="tile" type="gold-scoring-tile" :name="tile" class="tile"/>
    </div>
    <button class="btn btn-sm btn-outline-secondary mt-3" @click="randomize">{{t('setupGameBoard.goldScoringTile.randomize')}}</button>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '../structure/AppIcon.vue'
import getRandomGoldScoreTileSetup from '@/util/getRandomGoldScoreTileSetup'

export default defineComponent({
  name: 'GoldScoringTiles',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    tiles() : string[] {
      const { tile, side } = this.state.setup.goldScoreTileSetup ?? {}
      const result : string[] = []
      if (tile && side) {
        for (let i=0; i < tile.length && i < side.length; i++) {
          result.push(`${tile[i]}-${side[i]}`)
        }
      }
      return result
    }
  },
  methods: {
    randomize() : void {
      this.state.setup.goldScoreTileSetup = getRandomGoldScoreTileSetup()
    }
  }
})
</script>

<style lang="scss" scoped>
.tiles {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  .tile {
    width: 5rem;
  }
}
</style>
