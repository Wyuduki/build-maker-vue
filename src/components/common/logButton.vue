<script setup lang="ts">
import { toRaw } from 'vue';
import { logObject } from '@/ts/logger';

const props = defineProps(['keyValue', 'value']);

function cp(target: any) {
  return structuredClone(toRaw(target));
}
</script>

<template>
  <button
    @click="
      {
        logObject({ [props.keyValue!]: cp(props.value) });
      }
    "
  >
    log {{ props.keyValue }}
  </button>
</template>
