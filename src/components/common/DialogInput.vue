<script setup lang="ts">
//:: view
//:: vue
import { ref, watch, useTemplateRef } from 'vue';
//:: tsClass
//:: ts
import { debugObject } from '@/ts/logger';
//:: constant
const dialog = useTemplateRef('refDialog');
const emit = defineEmits(['sbm', 'close']);
//:: ref
const props = defineProps({
  flag: Boolean,
  items: Array<{ key: string; type: string; value?: string }>,
});

const inputValue = ref<any[]>([]);

//:: variable

watch(props, (p) => {
  if (p.flag) {
    inputValue.value = [];
    props.items?.forEach((item) => {
      inputValue.value.push(item.value);
    });
    dialog.value!.showModal();
  }
});

class DialogInput {
  eventSubmit(): void {
    emit('sbm', inputValue.value);
  }

  eventClose(): void {
    dialog.value!.close();
    emit('close');
  }
}

const dialogInput = new DialogInput();
</script>

<template>
  <dialog ref="refDialog">
    <form method="dialog" @submit="dialogInput.eventSubmit">
      <input
        v-for="(item, index) in items"
        v-model="inputValue[index]"
        :placeholder="item.key"
        required="true"
      />
      <button @click="dialogInput.eventClose" type="button">×</button>
      <button type="submit">保存</button>
    </form>
  </dialog>
</template>

<style></style>
