<script setup lang="ts">
//import HelloWorld from './HelloWorld.vue';
//import TheWelcome from './TheWelcome.vue';
import Displaysections from './DisplaySection.vue';
import Form from './Form.vue';
import LogButton from '../common/logButton.vue';
import Mainmenu from './Mainmenu.vue';
import { logFunction } from '../../ts/logger';

import { ref, type Ref, useTemplateRef, type ShallowRef } from 'vue';

import Section from './../../ts/Section';
import Attribute from './../../ts/Attribute';

/** すべてをまとめたデータ． */
const sections: Ref<Section[]> = ref([]);

const currentSection = ref();
let currentOp: string = '';

/** formを包むdialogタグ． */
const dialog = useTemplateRef('dialogRef');

let isSectionListActive: Ref<boolean> = ref(true);

class App {
  /** formを開く． */
  showDialog() {
    dialog.value!.showModal();
  }

  /** Create Section */
  createSection() {
    currentSection.value = new Section();
    console.debug(currentSection);
    this.showDialog();
    sections.value.push(currentSection.value);
  }

  /** Update Section */
  updateSection(index: number) {
    currentSection.value = sections.value[index];
    this.showDialog();
  }

  /** Delete Section */
  deleteSection(index: number) {
    sections.value.splice(index, 1);
  }

  @logFunction
  setOp(op: string) {
    currentOp = op;
    isSectionListActive.value = false;
  }

  /**  */
  judgeOp(index: number) {
    isSectionListActive.value = true;
    if (currentOp == 'update') {
      this.updateSection(index);
    } else if (currentOp == 'delete') {
      this.deleteSection(index);
    }
  }
}
const app = new App();

// 以下，デバッグ用．
sections.value.push(new Section('example1', [new Attribute('attr1', 'key1')]));
sections.value.push(
  new Section('example2', [new Attribute('attr21', 'key21'), new Attribute('attr22', 'key22')]),
);
console.debug(sections.value);
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./../../assets/logo.svg" width="125" height="125" />
    <LogButton keyValue="sections" :value="sections" />
    <Mainmenu :sections="sections" @sbm="(sect) => (sections = sect)" />
    <div class="wrapper">
      <!--<HelloWorld msg="You did it!" />-->
    </div>
  </header>

  <main>
    <menu>
      <li><button @click="app.createSection()">作成</button></li>
      <li>
        <button @click="app.setOp('update')">編集</button>
      </li>
      <li><button @click="app.setOp('delete')">削除</button></li>
    </menu>
    <ul :class="{ none: isSectionListActive }">
      <li><button @click="isSectionListActive = true">キャンセル</button></li>
      <li v-for="(section, index) in sections">
        <button @click="app.judgeOp(index)">
          {{ section.name }}
        </button>
      </li>
    </ul>
    <Displaysections :sections="sections" />
    <!--<TheWelcome />-->
  </main>
  <dialog ref="dialogRef">
    <Form :currentSection="currentSection" @sbm="(sect) => (currentSection = sect)" />
  </dialog>
</template>

<style scoped>
header {
  line-height: 1.5;
  place-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

menu {
  list-style-type: none;
  display: flex;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    /*display: block;*/
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    place-items: center;
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
