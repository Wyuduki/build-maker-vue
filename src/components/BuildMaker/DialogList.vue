<script setup lang="ts">
import AttributeUnit from './AttributeUnit.vue';
import LogButton from '../common/LogButton.vue';
import { ref, watch, useTemplateRef } from 'vue';
import { type Ref } from 'vue';
//import { logFunction } from './../logger.js';
import Attribute from '../../ts/Attribute';
import Section from '../../ts/Section';
import { logObject, debugObject } from '@/ts/logger';
import { FetchData } from '@/ts/FetchData';

const dialog = useTemplateRef('refDialog');

/** 受け取った引数。 */
const fetch = new FetchData();
const props = defineProps(['flag', 'imagePath', 'list', 'loadPath', 'setting']);

/** porpsを書き換えるのはできないので，ローカル変数に退避する． */
let localProps = ref();
watch(props, (p) => {
  if (p.flag) {
    localProps.value = p.list;
    dialog.value!.showModal();
    logObject({ localProps: localProps.value });
  }
});

const currentChoice = ref();

const emit = defineEmits(['sbm', 'close']);

const specialAttributes: Ref<any[]> = ref([]);

props.setting.forEach((element: any) => {
  specialAttributes.value.push(
    new Attribute().applyTo<Attribute>(
      {
        jsonKey: element.key,
        text: element.text,
        img: element.img,
      },
      new Attribute(),
    ),
  );
});

function eventSubmit(currentChoice: object) {
  debugObject('FormList submit', currentChoice);
  emit('sbm', currentChoice || props.list[props.list.length - 1]);
}

function eventClose(): void {
  dialog.value!.close();
  emit('close');
}
</script>

<template>
  <dialog ref="refDialog">
    <LogButton :key-value="'props'" :value="props" />
    <h1>FormList</h1>
    <form method="dialog" @submit="eventSubmit(currentChoice)">
      <p>{{ currentChoice?.id }}</p>
      <button>保存</button>
      <button v-for="element in props.list" @click="currentChoice = element" type="button">
        <AttributeUnit
          v-for="attr in specialAttributes"
          :imagePath="imagePath || 'empty'"
          :currentChoice="element"
          :attribute="attr"
        />
      </button>
    </form>
  </dialog>
</template>

<style scoped>
fieldset > label > input,
fieldset > div > * {
  display: block;
}

label {
  font-size: small;
  /* color: rgb(133, 132, 132); */
}
</style>
