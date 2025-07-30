<script setup lang="ts">
//:: view
import DialogInput from './common/DialogInput.vue';
import LogButton from './common/LogButton.vue';
//:: vue
import { ref } from 'vue';
//:: tsClass
import Project from '@/ts/Project';
//:: ts
import Path from '@/ts/Path';
import { logFunction, logObject, debugObject } from '@/ts/logger';
import { FetchData } from '@/ts/FetchData';

//:: constant
const fetch = new FetchData();
const savePath = '\\..\\..\\data\\';
const mkdirPath = '\\..\\..\\data\\save\\';

//:: ref
/** dialogInputを開くフラグ． */
const flagDialogInput = ref(false);
/** 作成したprojectの一覧． */
const projects = ref<Project[]>([]);
fetch.fetchData('link', savePath, 'load', 'loadFile').then((r) => {
  projects.value = JSON.parse(r);
  projects.value.forEach((element) => {
    fetch.fetchData<string>('', mkdirPath, 'mkdir', element.projectName);
  });
});
/** 選択中のproject．初期値を入れておかないと，HTMLでエラーが発生する． */
let currentProject = ref<Project>(new Project());
//:: variable

class Home {
  /**
   * @description 新規projectを即座に作成し，dialogInputを開く．
   */
  @logFunction()
  createProject(): void {
    currentProject.value = new Project();
    projects.value.push(currentProject.value);
    flagDialogInput.value = true;
    logObject({ currentProject: currentProject.value });
  }

  /**
   * @description 指定したprojectをdialogInputに代入し，dialogInputを開く．
   * @param index 指定したprojectのインデックス．
   */
  @logFunction()
  updateProject(index: number): void {
    currentProject.value = projects.value[index];
    flagDialogInput.value = true;
    logObject({ currentProject: currentProject.value });
  }

  /**
   * @description 指定したprojectを即座に削除する．その後，即座にlink.jsonに保存する．
   * @param index 指定したprojectのインデックス．
   */
  @logFunction()
  deleteProject(index: number): void {
    const delProj: Project = projects.value.splice(index, 1)[0];
    logObject({ deleteProject: delProj });
    fetch.fetchData('link', savePath, 'save', projects.value);
    //TODO: 変更確認のダイアログ．
    //TODO: rmdir.phpの実装．
  }

  /**
   * @description dialogInputに入力した値をcurrentProjectに代入する．その後，即座にlink.jsonに保存する．
   * @param projectName
   * @param dataName
   */
  @logFunction()
  applyInput(projectName: string, dataName: string): void {
    currentProject.value.projectName = projectName;
    currentProject.value.dataName = dataName;
    flagDialogInput.value = false;
    fetch.fetchData('link', savePath, 'save', projects.value);
    //TODO: updateの場合でも，リネームではなく新規作成になっている．
    fetch.fetchData<string>('', mkdirPath, 'mkdir', projectName);
  }
}
const home = new Home();
</script>

<template>
  <h1>Home</h1>
  <LogButton keyValue="projects" :value="projects" />
  <ul>
    <li v-for="(project, index) in projects">
      <h1>{{ project.projectName }}</h1>
      <RouterLink
        :to="{
          name: 'section-maker',
          params: { projectName: project.projectName, dataName: project.dataName },
        }"
        >Section-Maker</RouterLink
      >
      <RouterLink
        :to="{
          name: 'build-maker',
          params: { projectName: project.projectName, dataName: project.dataName },
        }"
        >Build-Maker</RouterLink
      >
      <menu>
        <li>
          <button @click="home.updateProject(index)">編集</button>
        </li>
        <li><button @click="home.deleteProject(index)">削除</button></li>
      </menu>
    </li>
    <li><button @click="home.createProject()">作成</button></li>
  </ul>

  <DialogInput
    :flag="flagDialogInput"
    :items="[
      { key: 'project名', type: 'text', value: currentProject.projectName },
      { key: 'data名', type: 'text', value: currentProject.dataName },
    ]"
    @sbm="
      (value: string[]) => {
        home.applyInput(value[0], value[1]);
      }
    "
    @close="() => (flagDialogInput = false)"
  />
</template>
