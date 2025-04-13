<template>
  <slot name="summary"></slot>
  <hr/>
  <button class="btn btn-sm btn-outline-secondary mb-2" data-bs-toggle="collapse" data-bs-target="#fullRulesCollapse">{{t('roundTurnBot.rules')}}</button>
  <div class="collapse" id="fullRulesCollapse">
    <slot name="rules"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionBox',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
