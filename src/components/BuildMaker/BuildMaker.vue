<script setup lang="ts">
//:: view
import LogButton from '../common/LogButton.vue';
import DialogList from './DialogList.vue';
import SaveAs from '../common/SaveAs.vue';
import Load from '../common/Load.vue';
import DisplaySection from '../common/DisplaySection.vue';
//:: vue
import { ref } from 'vue';
//:: tsClass
import Section from '@/ts/Section';
//:: ts
import Path from '@/ts/Path';
import { logObject, debugObject } from '@/ts/logger';
import { FetchData } from '@/ts/FetchData';
//:: constant
const props = defineProps<{ projectName: string; dataName: string }>();
Path.initialize(props.projectName, props.dataName);

const imagePath = '.\\..\\data\\' + props.dataName + '\\image\\';
const listLoadPath = '\\..\\..\\data\\' + props.dataName + '\\json\\';

const fetch = new FetchData();

/** settings.jsonの読み込み． */
let settings: { FormList: Record<string, object> };
logObject({ Path_setting: Path.setting });
fetch.fetchData('settings', Path.setting, 'load', 'loadFile').then((r) => {
  settings = JSON.parse(r);
  logObject({ settings });
});
//:: ref
const lists = ref<Record<string, object[]>>({});
const sections = ref<Section[]>([]);
const choices = ref<any[]>([]);

/** choicesやlistsのインデックスになる． */
const currentIndex = ref([0, 0]);

// sectionsの読み込み．
fetch.fetchData('save', Path.build, 'load', 'loadFile').then((r) => {
  sections.value = JSON.parse(r);

  // listsの読み込み．
  sections.value.forEach((section: Section) => {
    fetch.fetchData(section.dataKey, listLoadPath, 'load', 'loadFile').then((r) => {
      lists.value[section.dataKey] = JSON.parse(r);
      buildMaker.makeDefaultListElement(lists.value[section.dataKey]);
    });
  });
  for (let i = 0; i < sections.value.length; i++) {
    choices.value.push([]);
    for (let j = 0; j < sections.value[i].row * sections.value[i].column; j++) {
      choices.value[i].push({});
    }
  }
});

/** dialogSectionを開くフラグ． */
const flagsDialogList = ref<Record<string, boolean>>({});
for (const key in lists) {
  flagsDialogList.value[key] = false;
}
//:: variable

class BuildMaker {
  /**
   * @description 各リストのデフォルト要素（何も選ばれなかった場合）を作成する．
   * @param list
   */
  makeDefaultListElement(list: object[]) {
    const lastElement: Record<string, any> = list[list.length - 1];
    let newElement: Record<string, any> = {};
    for (const key in lastElement) {
      if (key == 'id') {
        newElement[key] = '00000000';
        continue;
      }

      switch (typeof lastElement[key]) {
        case 'string':
          newElement[key] = 'empty';
          break;
        case 'number':
          newElement[key] = -1;
          break;
        case 'object':
          if (Array.isArray(lastElement[key])) {
            newElement[key] = ['empty'];
          } else {
            newElement[key] = {};
          }
          break;
        default:
          newElement[key] = null;
          console.warn(
            lastElement + '[' + key + ']の型に対応していません．type:',
            typeof lastElement[key],
          );
      }
    }
    list.push(newElement);
  }

  /**
   * @descripton 指定したlistを開く。
   * @param index リストのインデックス。
   * @param index2 tableのインデックス。
   * @param dataKey flagsDialogListのキー。
   */
  showDialog(index: number, index2: number, dataKey: string) {
    currentIndex.value[0] = index;
    currentIndex.value[1] = index2;
    flagsDialogList.value[dataKey] = true;
  }
}

const buildMaker = new BuildMaker();
</script>

<template>
  <header>
    <nav>
      <RouterLink
        :to="{ name: 'section-maker', params: { projectName: projectName, dataName: dataName } }"
        >Section-Maker</RouterLink
      >
    </nav>
  </header>
  <h1>Build-Maker</h1>
  <h2>project = {{ props.projectName }}</h2>
  <LogButton keyValue="sections" :value="sections" />
  <LogButton keyValue="lists" :value="lists" />
  <LogButton keyValue="choices" :value="choices" />
  <h2>{{ Path.build }}</h2>
  <menu>
    <li><SaveAs :path="Path.build" :data="choices" /></li>
    <li><Load @sbm="(val) => (choices = val)" /></li>
  </menu>
  <menu>
    <!-- 各sectionの選択 -->
    <li v-for="(section, index) in sections">
      <button
        v-for="n in section.row * section.column"
        @click="buildMaker.showDialog(index, n - 1, section.dataKey)"
      >
        {{ section.name }}
      </button>
    </li>
  </menu>

  <main class="wrapper">
    <DisplaySection :sections="sections" :choices="choices" :imagePath="imagePath" />
  </main>
  <DialogList
    v-for="(list, key) in lists"
    :flag="flagsDialogList[key]"
    :imagePath="imagePath || 'empty'"
    :list="list"
    :loadPath="Path.build"
    :setting="settings.FormList[key]"
    @sbm="
      (ret) => {
        debugObject('ret', ret);
        choices[currentIndex[0]][currentIndex[1]] = ret;
        flagsDialogList[key] = false;
      }
    "
    @close="() => (flagsDialogList[key] = false)"
  />
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}

section {
  width: fit-content;
  border: 1px solid white;

  & .attribute-title {
    display: block;
    width: fit-content;
  }
  & .attribute-box {
    display: inline-block;
    width: fit-content;
    min-width: 300px;
    position: relative;
    border: 1px solid white;
    padding: 15px 5px 5px 5px;
    margin: 10px;
  }
  & .attribute-category {
    top: -10px;
    left: 10px;
    position: absolute;
    background-color: black;
    & > * {
      display: inline-block;
    }
  }
  & .attribute-name {
    font-size: small;
  }
  & .attribute-unit {
    /*display: inline-block;*/
  }
}
</style>
