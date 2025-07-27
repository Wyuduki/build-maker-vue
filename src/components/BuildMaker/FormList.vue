<script setup lang="ts">
import AttributeUnit from './AttributeUnit.vue';
import LogButton from '../common/LogButton.vue';
import { ref, watch } from 'vue';
import { type Ref } from 'vue';
//import { logFunction } from './../logger.js';
import Attribute from '../../ts/Attribute';
import Section from '../../ts/Section';
import { debugObject } from '@/ts/logger';
import { FetchData } from '@/ts/FetchData';

/** 受け取った引数。 */
const fetch = new FetchData();
const props = defineProps(['imagePath', 'list', 'loadPath', 'setting']);

/** porpsを書き換えるのはできないので，ローカル変数に退避する． */
let localProps = ref();
watch(props.list!, (p) => {
  localProps.value = p;
  debugObject('formList', localProps.value);
});

const currentChoice = ref();

const emit: (event: 'sbm', ...args: any[]) => void = defineEmits(['sbm']);

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

//function createAttribute() {
//  localProps.value.attributes.push(new Attribute());
//}

//function deleteAttribute(index: number) {
//  localProps.value.attributes.splice(index, 1);
//}
</script>

<template>
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
