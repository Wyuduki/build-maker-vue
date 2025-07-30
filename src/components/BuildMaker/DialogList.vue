<script setup lang="ts">
//:: view
import AttributeUnit from '../common/AttributeUnit.vue';
import LogButton from '../common/LogButton.vue';

//:: vue
import { ref, watch, useTemplateRef } from 'vue';
import { type Ref } from 'vue';
//:: tsClass
import Attribute from '../../ts/Attribute';
//:: ts
import { FetchData } from '@/ts/FetchData';
import { logObject, debugObject } from '@/ts/logger';
//:: constant
const fetch = new FetchData();
const emit = defineEmits(['sbm', 'close']);
const dialog = useTemplateRef('refDialog');
/** 受け取った引数。 */
const props = defineProps(['flag', 'imagePath', 'list', 'loadPath', 'setting']);
//:: ref
const currentChoice = ref();
/** list要素の表示内容。 */
const specialAttributes: Ref<any[]> = ref([]);

//:: variable


//TODO: 並び替え、絞り込みの追加。
/** porpsを書き換えるのはできないので，ローカル変数に退避する． */
let localProps = ref();
watch(props, (p) => {
  if (p.flag) {
    localProps.value = p.list;
    dialog.value!.showModal();
    logObject({ localProps: localProps.value });
  }
});



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

class DialogList {
  eventSubmit(currentChoice: object) {
    debugObject('FormList submit', currentChoice);
    emit('sbm', currentChoice || props.list[props.list.length - 1]);
  }
  
  eventClose(): void {
    dialog.value!.close();
    emit('close');
  }
}
const dialogList = new DialogList();
</script>

<template>
  <dialog ref="refDialog">
    <LogButton :key-value="'props'" :value="props" />
    <h1>FormList</h1>
    <form method="dialog" @submit="dialogList.eventSubmit(currentChoice)">
      <p>{{ currentChoice?.id }}</p>
            <button @click="dialogList.eventClose" type="button">×</button>
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
