<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue';
import { debugObject } from '@/ts/logger';

const props = defineProps({ flag: Boolean });

const dialog = useTemplateRef('refDialog');

const emit = defineEmits(['sbm']);

const text = ref('');

watch(props, (p) => {
  dialog.value!.showModal();
});
class DialogInput {
  eventSubmit() {
    emit('sbm', text.value);
  }
}

const dialogInput = new DialogInput();
</script>

<template>
  <dialog ref="refDialog">
    <form method="dialog">
      <input v-model="text" />
      <button @click="dialog?.close()" type="button">×</button>
      <button @click="dialogInput.eventSubmit">保存</button>
    </form>
  </dialog>
</template>

<style></style>
