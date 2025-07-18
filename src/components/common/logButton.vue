<script setup lang="ts">
import { logObject } from '@/ts/logger';

const props = defineProps(['keyValue', 'value']);
</script>

<template>
  <button @click="logObject({ [props.keyValue!]: props.value })">LogButton</button>
</template>
