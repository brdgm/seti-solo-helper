<template>
  <h3 class="mt-4 mb-3">{{t('setup.startPlayer.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-check-inline">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="startPlayerSelection" v-model="state.setup.startPlayer" :value="undefined">
          {{t('setup.startPlayer.random')}}
        </label>
      </div>
      <div class="form-check form-check-inline" v-for="player in players" :key="player">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="startPlayerSelection" v-model="state.setup.startPlayer" :value="player">
          {{t(`setup.startPlayer.${player}`)}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Player from '@/services/enum/Player'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'StartPlayer',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    players(): Player[] {
      return getAllEnumValues(Player)
    }
  }
})
</script>
