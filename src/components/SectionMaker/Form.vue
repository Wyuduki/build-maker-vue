<script setup lang="ts">
import { ref, watch } from 'vue';
import { type Ref } from 'vue';
//import { logFunction } from './../logger.js';
import Attribute from '../../ts/Attribute';
import Section from '../../ts/Section';

/** 受け取った引数。 */
const props = defineProps({ currentSection: Object });
console.debug(props);

/** porpsを書き換えるのはできないので，ローカル変数に退避する． */
let localProps = ref(new Section());
watch(props, (p) => {
  localProps.value = new Section(p.currentSection!.name, p.currentSection!.attributes);
  console.debug(localProps.value);
});

const emit: (event: 'sbm', ...args: any[]) => void = defineEmits(['sbm']);

function eventSubmit() {
  emit('sbm', localProps.value);
}

function createAttribute() {
  localProps.value.attributes.push(new Attribute());
}

function deleteAttribute(index: number) {
  localProps.value.attributes.splice(index, 1);
}
</script>

<template>
  <form method="dialog" @submit="eventSubmit">
    <input v-model="localProps.name" type="text" placeholder="component-name" />
    <button type="button" @click="createAttribute">追加</button>
    <fieldset v-for="(attribute, index) in localProps.attributes">
      <legend>追加要素</legend>
      <label>
        jsonファイルのキー:
        <input v-model="attribute.jsonKey" placeholder="key" />
      </label>
      <label>
        カテゴリー名:
        <input v-model="attribute.name" placeholder="category" />
      </label>
      <label>
        要素の文字サイズ:
        <select v-model="attribute.size">
          <option value="large">large</option>
          <option value="medium">medium</option>
          <option value="small">small</option>
          <option value="none">none</option>
        </select>
      </label>
      <div>
        <label>
          画像を使用する:
          <input v-model="attribute.img.need" type="checkbox" />
        </label>
        <label>
          画像のタイプ:
          <select :disabled="!attribute.img.need">
            <option value="png">png</option>
            <option value="jpg">jpg</option>
          </select>
        </label>
        <label>
          画像幅:
          <input
            v-model="attribute.img.width"
            :disabled="!attribute.img.need"
            type="number"
            min="50"
            step="50"
            placeholder="width"
          />
        </label>
        <label>
          画像高さ:
          <input
            v-model="attribute.img.height"
            :disabled="!attribute.img.need"
            type="number"
            min="50"
            step="50"
            placeholder="height"
          />
        </label>
      </div>
      <button @click="deleteAttribute(index)" type="button">削除</button>
    </fieldset>
    <button>保存</button>
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
