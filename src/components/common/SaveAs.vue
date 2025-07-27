<script setup lang="ts">
import DialogInput from './DialogInput.vue';
import { ref } from 'vue';
import { FetchData } from '@/ts/FetchData';

const props = defineProps(['path', 'data']);

const fetch = new FetchData();

const flag = ref(false);

const emit = defineEmits(['sbm']);
</script>

<template>
  <button @click="flag = true">名前を付けて保存</button>
  <DialogInput
    :flag="flag"
    :items="[{ key: 'file-name', type: 'text' }]"
    @sbm="
      (value: string[]) => {
        fetch.fetchData(value[0], props.path, 'save', props.data);
      }
    "
    @close="() => (flag = false)"
  />
</template>
