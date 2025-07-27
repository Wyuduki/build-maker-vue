<script setup lang="ts">
import LogButton from '../common/LogButton.vue';
import FormList from './FormList.vue';
import SaveAs from '../common/SaveAs.vue';
import Load from '../common/Load.vue';
import AttributeUnit from './AttributeUnit.vue';
import DisplaySection from '../SectionMaker/DisplaySection.vue';

import { ref, useTemplateRef } from 'vue';
import { FetchData } from '@/ts/FetchData';
import { debugObject } from '@/ts/logger';
import Section from '@/ts/Section';

const props = defineProps<{ projectName: string; dataName: string }>();

const fetch = new FetchData();
const saveLoadPath = '\\..\\..\\data\\save\\' + props.projectName + '\\';

const lists = ref<Record<string, object[]>>({});

const choices = ref<any[]>([]);

const dialog = useTemplateRef('refDialog');

const imagePath = '.\\..\\data\\' + props.dataName + '\\image\\';

const sections = ref<Section[]>([]);
fetch.fetchData('save', saveLoadPath, 'load', 'loadFile').then((r) => {
  sections.value = JSON.parse(r);
  debugObject('sections', sections.value);

  const listLoadPath = '\\..\\..\\data\\' + props.dataName + '\\json\\';

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
      choices.value[i].push([]);
    }
  }
  debugObject('lists', lists.value);
});

let settings: { FormList: Record<string, object> };
fetch.fetchData('settings', saveLoadPath, 'load', 'loadFile').then((r) => {
  settings = JSON.parse(r);
});

//const choices = ref<Array<Array<any>>>([]);

const currentIndex = ref([0, 0]);

class BuildMaker {
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
  /** formを開く． */
  showDialog(index: number, index2: number) {
    currentIndex.value[0] = index;
    currentIndex.value[1] = index2;
    dialog.value![index].showModal();
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
  <h2>{{ saveLoadPath }}</h2>
  <menu>
    <li><SaveAs :path="saveLoadPath" :data="choices" /></li>
    <li><Load @sbm="(val) => (choices = val)" /></li>
  </menu>
  <menu>
    <!-- 各sectionの選択 -->
    <li v-for="(section, index) in sections">
      <button
        v-for="n in section.row * section.column"
        @click="buildMaker.showDialog(index, n - 1)"
      >
        {{ section.name }}
      </button>
    </li>
  </menu>

  <main class="wrapper">
    <!--<section v-for="(section, index) in sections">
      <h1 class="attribute-title">{{ section.name }}</h1>
      <table>
        <tr v-for="n in section.row">
          <td v-for="m in section.column">
            <div class="attribute-box" v-for="attribute in section.attributes">
              <div class="attribute-category">
                <h2 class="attribute-name">{{ attribute.name }}</h2>
                <p>{{ attribute.jsonKey }}</p>
              </div>
              <AttributeUnit
                :imagePath="imagePath || 'empty'"
                :currentChoice="choices[index]?.[m - 1 + (n - 1) * section.column]"
                :attribute="attribute"
                />
              </div>
            </td>
          </tr>
        </table>
      </section>-->
    <DisplaySection :sections="sections" :choices="choices" :imagePath="imagePath" />
  </main>
  <dialog ref="refDialog" v-for="(list, key) in lists">
    <FormList
      :imagePath="imagePath || 'empty'"
      :list="list"
      :loadPath="saveLoadPath"
      :setting="settings.FormList[key]"
      :dataName="dataName"
      @sbm="
        (ret) => {
          debugObject('ret', ret);
          choices[currentIndex[0]][currentIndex[1]] = ret;
        }
      "
    />
  </dialog>
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
