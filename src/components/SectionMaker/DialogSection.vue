<script setup lang="ts">
//:: view
//:: vue
import { ref, watch, useTemplateRef, toRaw } from 'vue';
//:: tsClass
import Section from '@/ts/Section';
import Attribute from '@/ts/Attribute';
//:: ts
import { logFunction, logObject, debugObject } from '@/ts/logger';
//:: constant
const dialog = useTemplateRef('refDialog');
const emit = defineEmits(['sbm', 'close']);
//:: ref
/** 受け取った引数。 */
const props = defineProps({
  flag: Boolean,
  currentSection: Section,
});
//:: variable
/** porpsを書き換えるのはできないので，ローカル変数に退避する． */
let localProps = ref(new Section());

watch(props, (p) => {
  if (p.flag) {
    localProps.value = new Section().applyTo<Section>(toRaw(p.currentSection!), new Section());
    dialog.value!.showModal();
    logObject({ localProps: localProps.value });
  }
});

class DialogSection {
  @logFunction()
  eventSubmit(): void {
    logObject({ submit: localProps.value });
    emit('sbm', localProps.value);
  }

  eventClose(): void {
    dialog.value!.close();
    emit('close');
  }

  createAttribute() {
    localProps.value.attributes.push(new Attribute());
  }
  deleteAttribute(index: number) {
    localProps.value.attributes.splice(index, 1);
  }
}
const dialogSection = new DialogSection();
</script>

<template>
  <dialog ref="refDialog">
    <form method="dialog" @submit="dialogSection.eventSubmit">
      <!-- sectionそのものの項目． -->
      <fieldset>
        <input v-model="localProps.name" type="text" placeholder="component-name" />
        <input v-model="localProps.dataKey" type="text" placeholder="component-key" />
        <label>
          行数:
          <input v-model="localProps.row" type="number" placeholder="row" />
        </label>
        <label>
          行数:
          <input v-model="localProps.column" type="number" placeholder="column" />
        </label>
      </fieldset>
      <button type="button" @click="dialogSection.createAttribute">追加</button>
      <!-- attributeの項目． -->
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
        <div>
          <label>
            テキストを使用する:
            <input v-model="attribute.text.need" type="checkbox" />
          </label>
          <label>
            要素の文字サイズ:
            <select v-model="attribute.text.size" :disabled="!attribute.text.need">
              <option value="large">large</option>
              <option value="medium">medium</option>
              <option value="small">small</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            画像を使用する:
            <input v-model="attribute.img.need" type="checkbox" />
          </label>
          <label>
            画像のタイプ:
            <select v-model="attribute.img.type" :disabled="!attribute.img.need">
              <option value=".png">.png</option>
              <option value=".jpg">.jpg</option>
            </select>
          </label>
          <label>
            画像のパス:
            <input
              v-model="attribute.img.path"
              :disabled="!attribute.img.need"
              type="text"
              placeholder="path"
            />
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
        <button @click="dialogSection.deleteAttribute(index)" type="button">削除</button>
      </fieldset>
      <button @click="dialogSection.eventClose" type="button">×</button>
      <button type="submit">保存</button>
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
