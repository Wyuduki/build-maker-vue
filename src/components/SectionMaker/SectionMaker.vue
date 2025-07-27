<script setup lang="ts">
//:: view
import Displaysections from './DisplaySection.vue';
import DialogSection from './DialogSection.vue';
import Mainmenu from './Mainmenu.vue';
import LogButton from '../common/LogButton.vue';

//:: vue
import { ref, type Ref } from 'vue';
//:: tsClass
import Section from './../../ts/Section';
import Attribute from './../../ts/Attribute';
//:: ts
import { logFunction, logObject, debugObject } from '../../ts/logger';
//:: constant
/** dialogSectionを開くフラグ． */
const flagDialogSection = ref(false);

//:: ref
const props = defineProps<{ projectName: string; dataName: string }>();

/** すべてをまとめたデータ． */
const sections: Ref<Section[]> = ref([]);

/** 更新対象のsection． */
let currentSection: Ref<Section> = ref(new Section());

const flagSectionListActive: Ref<boolean> = ref(false);
//:: variable
/** update or delete */
let currentOp: string = '';

class App {
  /**
   * @description 新規sectionを即座に作成し，dialogを開く．
   */
  @logFunction()
  createSection(): void {
    currentSection.value = new Section();
    sections.value.push(currentSection.value);
    flagDialogSection.value = true;
    logObject({ currentSection: currentSection.value });
  }

  /**
   * @description 指定したsectionをdialogSectionに代入し，dialogSectionを開く．
   * @param index 指定したsectionのインデックス．
   */
  @logFunction()
  updateSection(index: number): void {
    currentSection.value = sections.value[index];
    flagDialogSection.value = true;
    logObject({ currentSection: currentSection.value });
  }

  /**
   * @description 指定したsectionを即座に削除する．
   * @param index 指定したsectionのインデックス．
   */
  @logFunction()
  deleteSection(index: number): void {
    sections.value.splice(index, 1);
  }

  @logFunction()
  setOp(op: string): void {
    currentOp = op;
    flagSectionListActive.value = true;
  }

  /**  */
  judgeOp(index: number) {
    flagSectionListActive.value = false;
    if (currentOp == 'update') {
      this.updateSection(index);
    } else if (currentOp == 'delete') {
      this.deleteSection(index);
    }
  }

  applyInput(sect: Section) {
    for (const key in sect) {
      if (sect[key] == undefined) {
        console.error('sectにundefinedの項目があります．');
        continue;
      }
      currentSection.value[key] = sect[key];
    }
  }

  @logFunction()
  applyLoadSects(sects: Section[]) {
    sections.value = [];
    sects.forEach((sect) => {
      sections.value.push(new Section().applyTo<Section>(sect, new Section()));
    });
    debugObject('sections', sections.value);
  }
}
const sectionMaker = new App();
</script>

<template>
  <header>
    <nav>
      <RouterLink
        :to="{ name: 'build-maker', params: { projectName: projectName, dataName: dataName } }"
        >Build-Maker</RouterLink
      >
    </nav>
    <img alt="Vue logo" class="logo" src="./../../assets/logo.svg" width="125" height="125" />
    <LogButton keyValue="sections" :value="sections" />
    <Mainmenu
      :sections="sections"
      :projectName="projectName"
      @sbm="(sects) => sectionMaker.applyLoadSects(sects)"
    />
    <div class="wrapper"></div>
  </header>

  <menu>
    <!-- sectionに対する操作 -->
    <li><button @click="sectionMaker.createSection()">作成</button></li>
    <li>
      <button @click="sectionMaker.setOp('update')">編集</button>
    </li>
    <li><button @click="sectionMaker.setOp('delete')">削除</button></li>
  </menu>
  <menu v-if="flagSectionListActive">
    <!-- 各sectionの選択 -->
    <li><button @click="flagSectionListActive = false">キャンセル</button></li>
    <li v-for="(section, index) in sections">
      <button @click="sectionMaker.judgeOp(index)">
        {{ section.name }}
      </button>
    </li>
  </menu>
  <main>
    <Displaysections :sections="sections" />
  </main>
  <DialogSection
    :flag="flagDialogSection"
    :currentSection="currentSection"
    @sbm="
      (sect) => {
        flagDialogSection = false;
        sectionMaker.applyInput(sect);
      }
    "
    @close="() => (flagDialogSection = false)"
  />
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
