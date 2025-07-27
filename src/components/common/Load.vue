<script setup lang="ts">
import { useTemplateRef } from 'vue';

const refInput: any = useTemplateRef('refInput');

const emit = defineEmits(['sbm']);

function eventChange(e: any) {
  let reader = new FileReader();
  reader.onload = (e) => {
    const loadResult: any = e.target!.result;
    emit('sbm', JSON.parse(loadResult));
  };
  reader.readAsText(e.target!.files[0]);
}
</script>

<template>
  <button @click="refInput.click()">開く</button>
  <input ref="refInput" @change="eventChange" class="none" type="file" />
</template>
